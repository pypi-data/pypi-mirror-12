"""
homeassistant.components.light.limitlessled
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Support for LimitlessLED bulbs, also known as...

- EasyBulb
- AppLight
- AppLamp
- MiLight
- LEDme
- dekolight
- iLight

https://home-assistant.io/components/light.limitlessled.html
"""
import logging

from homeassistant.const import DEVICE_DEFAULT_NAME
from homeassistant.components.light import (Light, ATTR_BRIGHTNESS,
                                            ATTR_XY_COLOR)
from homeassistant.util.color import color_RGB_to_xy

_LOGGER = logging.getLogger(__name__)
REQUIREMENTS = ['ledcontroller==1.1.0']


def setup_platform(hass, config, add_devices_callback, discovery_info=None):
    """ Gets the LimitlessLED lights. """
    import ledcontroller

    # Handle old configuration format:
    bridges = config.get('bridges', [config])

    for bridge_id, bridge in enumerate(bridges):
        bridge['id'] = bridge_id

    pool = ledcontroller.LedControllerPool([x['host'] for x in bridges])

    lights = []
    for bridge in bridges:
        for i in range(1, 5):
            name_key = 'group_%d_name' % i
            if name_key in bridge:
                group_type = bridge.get('group_%d_type' % i, 'rgbw')
                lights.append(LimitlessLED.factory(pool, bridge['id'], i,
                                                   bridge[name_key],
                                                   group_type))

    add_devices_callback(lights)


class LimitlessLED(Light):
    """ Represents a LimitlessLED light """

    @staticmethod
    def factory(pool, controller_id, group, name, group_type):
        ''' Construct a Limitless LED of the appropriate type '''
        if group_type == 'white':
            return WhiteLimitlessLED(pool, controller_id, group, name)
        elif group_type == 'rgbw':
            return RGBWLimitlessLED(pool, controller_id, group, name)

    # pylint: disable=too-many-arguments
    def __init__(self, pool, controller_id, group, name, group_type):
        self.pool = pool
        self.controller_id = controller_id
        self.group = group

        self.pool.execute(self.controller_id, "set_group_type", self.group,
                          group_type)

        # LimitlessLEDs don't report state, we have track it ourselves.
        self.pool.execute(self.controller_id, "off", self.group)

        self._name = name or DEVICE_DEFAULT_NAME
        self._state = False

    @property
    def should_poll(self):
        """ No polling needed. """
        return False

    @property
    def name(self):
        """ Returns the name of the device if any. """
        return self._name

    @property
    def is_on(self):
        """ True if device is on. """
        return self._state

    def turn_off(self, **kwargs):
        """ Turn the device off. """
        self._state = False
        self.pool.execute(self.controller_id, "off", self.group)
        self.update_ha_state()


class RGBWLimitlessLED(LimitlessLED):
    """ Represents a RGBW LimitlessLED light """

    def __init__(self, pool, controller_id, group, name):
        super().__init__(pool, controller_id, group, name, 'rgbw')

        self._brightness = 100
        self._xy_color = color_RGB_to_xy(255, 255, 255)

        # Build a color table that maps an RGB color to a color string
        # recognized by LedController's set_color method
        self._color_table = [(color_RGB_to_xy(*x[0]), x[1]) for x in [
            ((0xFF, 0xFF, 0xFF), 'white'),
            ((0xEE, 0x82, 0xEE), 'violet'),
            ((0x41, 0x69, 0xE1), 'royal_blue'),
            ((0x87, 0xCE, 0xFA), 'baby_blue'),
            ((0x00, 0xFF, 0xFF), 'aqua'),
            ((0x7F, 0xFF, 0xD4), 'royal_mint'),
            ((0x2E, 0x8B, 0x57), 'seafoam_green'),
            ((0x00, 0x80, 0x00), 'green'),
            ((0x32, 0xCD, 0x32), 'lime_green'),
            ((0xFF, 0xFF, 0x00), 'yellow'),
            ((0xDA, 0xA5, 0x20), 'yellow_orange'),
            ((0xFF, 0xA5, 0x00), 'orange'),
            ((0xFF, 0x00, 0x00), 'red'),
            ((0xFF, 0xC0, 0xCB), 'pink'),
            ((0xFF, 0x00, 0xFF), 'fusia'),
            ((0xDA, 0x70, 0xD6), 'lilac'),
            ((0xE6, 0xE6, 0xFA), 'lavendar'),
        ]]

    @property
    def brightness(self):
        return self._brightness

    @property
    def color_xy(self):
        return self._xy_color

    def _xy_to_led_color(self, xy_color):
        """ Convert an XY color to the closest LedController color string. """
        def abs_dist_squared(p_0, p_1):
            """ Returns the absolute value of the squared distance """
            return abs((p_0[0] - p_1[0])**2 + (p_0[1] - p_1[1])**2)

        candidates = [(abs_dist_squared(xy_color, x[0]), x[1]) for x in
                      self._color_table]

        # First candidate in the sorted list is closest to desired color:
        return sorted(candidates)[0][1]

    def turn_on(self, **kwargs):
        """ Turn the device on. """
        self._state = True

        if ATTR_BRIGHTNESS in kwargs:
            self._brightness = kwargs[ATTR_BRIGHTNESS]

        if ATTR_XY_COLOR in kwargs:
            self._xy_color = kwargs[ATTR_XY_COLOR]

        self.pool.execute(self.controller_id, "set_color",
                          self._xy_to_led_color(self._xy_color), self.group)
        self.pool.execute(self.controller_id, "set_brightness",
                          self._brightness / 255.0, self.group)
        self.update_ha_state()


class WhiteLimitlessLED(LimitlessLED):
    """ Represents a White LimitlessLED light """

    def __init__(self, pool, controller_id, group, name):
        super().__init__(pool, controller_id, group, name, 'white')

    def turn_on(self, **kwargs):
        """ Turn the device on. """
        self._state = True
        self.pool.execute(self.controller_id, "on", self.group)
        self.update_ha_state()

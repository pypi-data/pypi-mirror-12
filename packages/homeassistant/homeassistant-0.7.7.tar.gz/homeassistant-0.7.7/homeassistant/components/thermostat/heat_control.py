"""
homeassistant.components.thermostat.heat_control
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For more details about this platform, please refer to the documentation at
https://home-assistant.io/components/thermostat.heat_control.html
"""
import logging

import homeassistant.util as util
from homeassistant.components import switch
from homeassistant.components.thermostat import (ThermostatDevice, STATE_IDLE,
                                                 STATE_HEAT)
from homeassistant.helpers.event import track_state_change
from homeassistant.const import (
    ATTR_UNIT_OF_MEASUREMENT, TEMP_CELCIUS, TEMP_FAHRENHEIT)

DEPENDENCIES = ['switch', 'sensor']

TOL_TEMP = 0.3

CONF_NAME = 'name'
DEFAULT_NAME = 'Heat Control'
CONF_HEATER = 'heater'
CONF_SENSOR = 'target_sensor'

_LOGGER = logging.getLogger(__name__)


# pylint: disable=unused-argument
def setup_platform(hass, config, add_devices, discovery_info=None):
    """ Sets up the heat control thermostat. """
    name = config.get(CONF_NAME, DEFAULT_NAME)
    heater_entity_id = config.get(CONF_HEATER)
    sensor_entity_id = config.get(CONF_SENSOR)

    if None in (heater_entity_id, sensor_entity_id):
        _LOGGER.error('Missing required key %s or %s', CONF_HEATER,
                      CONF_SENSOR)
        return False

    add_devices([HeatControl(hass, name, heater_entity_id, sensor_entity_id)])


# pylint: disable=too-many-instance-attributes
class HeatControl(ThermostatDevice):
    """ Represents a HeatControl device. """

    def __init__(self, hass, name, heater_entity_id, sensor_entity_id):
        self.hass = hass
        self._name = name
        self.heater_entity_id = heater_entity_id

        self._active = False
        self._cur_temp = None
        self._target_temp = None
        self._unit = None

        track_state_change(hass, sensor_entity_id, self._sensor_changed)

        sensor_state = hass.states.get(sensor_entity_id)
        if sensor_state:
            self._update_temp(sensor_state)

    @property
    def should_poll(self):
        return False

    @property
    def name(self):
        """ Returns the name. """
        return self._name

    @property
    def unit_of_measurement(self):
        """ Returns the unit of measurement. """
        return self._unit

    @property
    def current_temperature(self):
        return self._cur_temp

    @property
    def operation(self):
        """ Returns current operation ie. heat, cool, idle """
        return STATE_HEAT if self._active and self._is_heating else STATE_IDLE

    @property
    def target_temperature(self):
        """ Returns the temperature we try to reach. """
        return self._target_temp

    def set_temperature(self, temperature):
        """ Set new target temperature. """
        self._target_temp = temperature
        self._control_heating()
        self.update_ha_state()

    def _sensor_changed(self, entity_id, old_state, new_state):
        """ Called when temperature changes. """
        if new_state is None:
            return

        self._update_temp(new_state)
        self._control_heating()
        self.update_ha_state()

    def _update_temp(self, state):
        """ Update thermostat with latest state from sensor. """
        unit = state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)

        if unit not in (TEMP_CELCIUS, TEMP_FAHRENHEIT):
            self._cur_temp = None
            self._unit = None
            _LOGGER.error('Sensor has unsupported unit: %s (allowed: %s, %s)',
                          unit, TEMP_CELCIUS, TEMP_FAHRENHEIT)
            return

        temp = util.convert(state.state, float)

        if temp is None:
            self._cur_temp = None
            self._unit = None
            _LOGGER.error('Unable to parse sensor temperature: %s',
                          state.state)
            return

        self._cur_temp = temp
        self._unit = unit

    def _control_heating(self):
        """ Check if we need to turn heating on or off. """
        if not self._active and None not in (self._cur_temp,
                                             self._target_temp):
            self._active = True
            _LOGGER.info('Obtained current and target temperature. '
                         'Heat control active.')

        if not self._active:
            return

        too_cold = self._target_temp - self._cur_temp > TOL_TEMP
        is_heating = self._is_heating

        if too_cold and not is_heating:
            _LOGGER.info('Turning on heater %s', self.heater_entity_id)
            switch.turn_on(self.hass, self.heater_entity_id)
        elif not too_cold and is_heating:
            _LOGGER.info('Turning off heater %s', self.heater_entity_id)
            switch.turn_off(self.hass, self.heater_entity_id)

    @property
    def _is_heating(self):
        """ If the heater is currently heating. """
        return switch.is_on(self.hass, self.heater_entity_id)

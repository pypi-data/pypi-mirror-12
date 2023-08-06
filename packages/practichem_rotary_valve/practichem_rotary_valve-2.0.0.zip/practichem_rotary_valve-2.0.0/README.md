## Example of direct instantiation. Faster if you know the port.
	from practichem_rotary_valve import RotaryValve
	from practichem_device import SerialHandler

	serial_handler = SerialHandler()
	serial_handler.openPort("COM32")
	serial_handler.start()
	valve = RotaryValve(serial_handler)

	valve.jog(60)

## Example using the DeviceManager which is in the practichem_device package
	from practichem_device import DeviceManager
	import practichem_rotary_valve # required to register the product name

	device_manager = DeviceManager()
	valve = device_manager.getDeviceByProductName("RotaryValve")

	valve.jog(60)
	
## Example using the emulated device
	from practichem_rotary_valve import RotaryValveEmulator
	valve = RotaryValveEmulator()
	valve.jog(60)
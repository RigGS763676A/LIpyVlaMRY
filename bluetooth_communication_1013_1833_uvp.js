// 代码生成时间: 2025-10-13 18:33:33
// Import required modules
import { Bluetooth } from '@ionic-native/bluetooth/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothCommunicationService {
  private bluetooth: Bluetooth;
  private device: any;
  private characteristic: any;
  private isConnected: boolean = false;

  constructor(private bluetoothService: Bluetooth) {
    this.bluetooth = bluetoothService;
  }

  // Initialize Bluetooth
  async initializeBluetooth() {
    try {
      // Request Bluetooth permissions
      await this.bluetooth.requestDevice({ acceptAllDevices: true });
      // Enable Bluetooth if it's not already enabled
      await this.bluetooth.enable();
      console.log('Bluetooth initialized successfully.');
    } catch (error) {
      console.error('Failed to initialize Bluetooth:', error);
    }
  }

  // Connect to a Bluetooth device
  async connectToDevice(deviceId: string) {
    try {
      this.device = await this.bluetooth.connect(deviceId);
      console.log('Connected to device:', this.device.id);
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to connect to device:', error);
    }
  }

  // Disconnect from the Bluetooth device
  async disconnectFromDevice() {
    if (this.isConnected) {
      try {
        await this.device.disconnect();
        console.log('Disconnected from device.');
        this.isConnected = false;
      } catch (error) {
        console.error('Failed to disconnect from device:', error);
      }
    }
  }

  // Write data to the connected Bluetooth device
  async writeData(data: any) {
    if (this.isConnected) {
      try {
        if (!this.characteristic) {
          const characteristics = await this.device.discoverCharacteristicsForService('');
          this.characteristic = characteristics.find(c => c.uuid === 'YOUR_CHARACTERISTIC_UUID');
        }
        await this.characteristic.write(data);
        console.log('Data written to device successfully.');
      } catch (error) {
        console.error('Failed to write data to device:', error);
      }
    } else {
      console.error('Not connected to any device.');
    }
  }

  // Read data from the connected Bluetooth device
  async readData() {
    if (this.isConnected) {
      try {
        if (!this.characteristic) {
          const characteristics = await this.device.discoverCharacteristicsForService('');
          this.characteristic = characteristics.find(c => c.uuid === 'YOUR_CHARACTERISTIC_UUID');
        }
        const data = await this.characteristic.read();
        console.log('Data read from device:', data);
        return data;
      } catch (error) {
        console.error('Failed to read data from device:', error);
      }
    } else {
      console.error('Not connected to any device.');
    }
  }
}

/**
 * HealthSensors Library_v1.0
 * Developed by VTC STEAM Education Centre
 */
//% color="#03AA74" icon="\u2665" block="HealthSensors"
namespace HealthSensors {
    
    //% block
    export function read_temperature(): number 
    {
        let temp_addr = 0x5A;
        pins.i2cWriteNumber(temp_addr, 0x07, NumberFormat.UInt8LE, true);
        let buff = pins.i2cReadBuffer(temp_addr, 3, false);
        let result = buff[0];
        result |= buff[1] << 8;
        result *= 0.02;
        result -= 273.15;

        return result;
    }
}

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


    // MAX30102
    let max30102_addr = 0xAE;
    let MAX30105_MODECONFIG = 0x09;
    let MAX30105_MODE_MASK = 0xF8;
    //% block
    export function init_heart_rate_sensor()
    {
        gatorParticle.begin()
    }
    
    //% block
    export function read_pulse(): number 
    {
        /*
        pins.i2cWriteNumber(max30102_addr, 0x07, NumberFormat.UInt8LE, true);
        let buff = pins.i2cReadBuffer(max30102_addr, 3, false);
        let result = buff[0];
        result |= buff[1] << 8;
        result *= 0.02;
        result -= 273.15;
        */
        let result = gatorParticle.heartbeat(HeartbeatType.BPM);
        if (result < 40 || result > 180)
        {
            result = 0;
        }
        return result;
    }
    
}

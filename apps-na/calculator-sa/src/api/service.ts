import { JSBridge } from '@redbull/services';

/**
 * trying to guard the rest of the package accidentally initialising jsb
 */
class BridgeServices extends JSBridge {}

const bridgeServices = new BridgeServices();

export default bridgeServices;

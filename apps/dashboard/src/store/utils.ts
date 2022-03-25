import { EEntityType, Channel, Tab } from '@redbull/services';
import bridgeServices from '../api/service';

const MY_CHANNEL = 'My Channel';
// need to find the personal tab.
export const getPrivateTab = async () => {
  const tabs = await bridgeServices.getList<Tab>({
    entityName: EEntityType.TAB,
    limit: 100,
  });
  if (!tabs.hasError) {
    return tabs.value.find((tab) => tab.isPersonal) || null;
  }
  console.error(JSON.stringify(tabs.error));
  return null;
};

export const getMyChannel = async (personalTabId: number) => {
  const channels = await bridgeServices.getList<Channel>({
    entityName: EEntityType.CHANNEL,
    parentEntityName: EEntityType.TAB,
    peid: personalTabId,
    limit: 100,
  });
  if (!channels.hasError) {
    return (
      channels.value.find((channel) => channel.name === MY_CHANNEL) || null
    );
  }
  console.error(JSON.stringify(channels.error));
  return null;
};

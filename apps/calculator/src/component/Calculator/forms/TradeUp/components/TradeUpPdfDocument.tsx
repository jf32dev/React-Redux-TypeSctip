import React from 'react';
import {
  Document,
  Page,
  View,
  Image,
  StyleSheet,
  Text,
  Font,
} from '@react-pdf/renderer';

import BullRegular from '@redbull/common/fonts/PDF/BullRegular.ttf';
import BullHeavy from '@redbull/common/fonts/PDF/BullHeavy.ttf';
import BullTextMedium from '@redbull/common/fonts/PDF/BullTextMedium.ttf';
import BullTextBold from '@redbull/common/fonts/PDF/BullTextBold.ttf';

import { useTranslation } from 'react-i18next';
import { size } from '../utils/config';

import RB250Single from '../../../../../images/250ml.png';
import RB355Single from '../../../../../images/355ml.png';
import RB473Single from '../../../../../images/473ml.png';

Font.register({
  family: 'BullHeavy',
  src: BullHeavy,
});

Font.register({
  family: 'BullRegular',
  src: BullRegular,
});

Font.register({
  family: 'BullTextMedium',
  src: BullTextMedium,
});

Font.register({
  family: 'BullTextBold',
  src: BullTextBold,
});

type TProps = {
  backgroundColor: string;
  colorTheme: string;
  shelfPrice: string;
  mediumShelfPrice: string;
  largeShelfPrice: string;
  shelfPricePerLitre: string;
  mediumShelfPricePerLitre: string;
  largeShelfPricePerLitre: string;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    height: '100%',
    margin: 0,
    padding: 0,
    position: 'relative',
    width: '100%',
  },
  leftColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '65%',
  },
  imageContent: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  resultContent: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'BullRegular',
    fontSize: 18,
    fontWeight: 400,
  },
  value: {
    fontFamily: 'BullHeavy',
    fontSize: 28,
    fontWeight: 800,
  },
  sub: {
    fontFamily: 'BullRegular',
    fontSize: 22,
    marginLeft: '4px',
    fontWeight: 400,
  },
  description: {
    marginTop: '5px',
    fontFamily: 'BullRegular',
    fontSize: 22,
    fontWeight: 400,
  },
});

const TradeUpPdfDocument = ({
  backgroundColor,
  colorTheme,
  shelfPrice,
  mediumShelfPrice,
  largeShelfPrice,
  shelfPricePerLitre,
  mediumShelfPricePerLitre,
  largeShelfPricePerLitre,
}: TProps) => {
  const { t } = useTranslation();
  return (
    <Document>
      <Page
        orientation="landscape"
        size="A4"
        style={{
          backgroundColor: backgroundColor.toLowerCase(),
          color: colorTheme === 'dark' ? '#000000' : '#ffffff',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <View style={styles.imageContent}>
              <Image
                src={RB250Single}
                style={{
                  width: '118px',
                  height: '310px',
                  marginRight: '20px',
                }}
              />
              <Image
                src={RB355Single}
                style={{
                  width: '131px',
                  height: '370px',
                  marginRight: '20px',
                }}
              />
              <Image
                src={RB473Single}
                style={{
                  width: '133px',
                  height: '400px',
                  marginRight: '20px',
                }}
              />
            </View>
          </View>
          <View>
            <View style={styles.resultContent}>
              <View style={{ margin: '30px' }}>
                <Text style={styles.title}>{size.regular}ml</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={styles.value}>{shelfPrice}</Text>
                  <Text style={styles.sub}>{t('inputs.rrp')}</Text>
                </View>
                <Text style={styles.description}>{shelfPricePerLitre} / L</Text>
              </View>
              <View style={{ margin: '30px' }}>
                <Text style={styles.title}>{size.medium}ml</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={styles.value}>{mediumShelfPrice}</Text>
                  <Text style={styles.sub}>{t('inputs.rrp')}</Text>
                </View>
                <Text style={styles.description}>
                  {mediumShelfPricePerLitre} / L
                </Text>
              </View>
              <View style={{ margin: '30px' }}>
                <Text style={styles.title}>{size.large}ml</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={styles.value}>{largeShelfPrice}</Text>
                  <Text style={styles.sub}>{t('inputs.rrp')}</Text>
                </View>
                <Text style={styles.description}>
                  {largeShelfPricePerLitre} / L
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TradeUpPdfDocument;

import React from 'react';
import {
  Font,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import BullRegular from '@redbull/common/fonts/PDF/BullRegular.ttf';
import BullHeavy from '@redbull/common/fonts/PDF/BullHeavy.ttf';
import BullTextMedium from '@redbull/common/fonts/PDF/BullTextMedium.ttf';
import { useTranslation } from 'react-i18next';

type Props = {
  backgroundColor: string;
  colourTheme: string;
  estAnnualProfit: string;
  estAnnualSales: string;
  estWeeklySales: string;
  image: string;
  tool: string;
};

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
    width: '50%',
  },
  rightColumn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  },
  columnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'BullRegular',
    fontSize: 25,
    fontWeight: 400,
    marginTop: '20px',
    padding: 0,
    position: 'relative',
  },
  value: {
    fontFamily: 'BullHeavy',
    fontSize: 36,
    fontWeight: 800,
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  tool: {
    fontFamily: 'BullTextMedium',
    fontSize: 20,
    fontWeight: 500,
    padding: 0,
    position: 'relative',
  },
});

const SalesDriverPdfDoc = ({
  backgroundColor,
  colourTheme,
  estAnnualProfit,
  estAnnualSales,
  estWeeklySales,
  image,
  tool,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Document>
      <Page
        object-fit="fill"
        orientation="landscape"
        size="A4"
        style={{
          backgroundColor: backgroundColor.toLowerCase(),
          color: colourTheme === 'dark' ? '#000000' : '#ffffff',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        {/* The elements seem to render in order from first at the bottom (think os it as x-index) */}
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <View style={styles.columnContent}>
              <Image
                src={image}
                style={{
                  width: 'auto', // max 338px to fit the column
                  minWidth: '150px',
                  height: '396px',
                }}
              />
              <Text style={styles.tool}>{tool}</Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.columnContent}>
              <Text style={[styles.title, { marginTop: 0 }]}>
                {t('inputs.estWeeklySales')}
              </Text>
              <Text style={styles.value}>{estWeeklySales}</Text>
              <Text style={styles.title}>{t('inputs.estAnnualValue')}</Text>
              <Text style={styles.value}>{estAnnualSales}</Text>
              <Text style={styles.title}>
                {t('inputs.estAnnualIncrementalValue')}
              </Text>
              <Text style={[styles.value, { marginBottom: '40px' }]}>
                {estAnnualProfit}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SalesDriverPdfDoc;

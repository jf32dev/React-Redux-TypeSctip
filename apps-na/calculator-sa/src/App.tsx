import * as React from 'react';
import AccountInfoPage from './components/AccountInfoPage/AccountInfoPage';
import Header from './components/Header';
import Geography from './components/Geography/Geography';
import ShelfCounts from './components/ShelfCounts/ShelfCounts';
import Output from './components/Output/Output';
import DateActionBtns from './components/DateActionButton/DateActionButtons';
import GeographicSalesData from './data/Geographic_Sales_Data.json';
import DistributorSalesData from './data/Distributor_Sales_Data.json';
import States from './data/States.json';
import Cities from './data/Cities.json';
import Distributors from './data/Distributors.json';

import styles from './App.module.scss';

type InputValue = {
  [key: string]: any;
};

type Itemlist = {
  Type: keyof InputValue;
  Category: keyof InputValue;
  YearGrowthPercent: any;
  MarketSalesPercent: any;
};

type CitiesType = {
  [key: string]: Array<object>;
};

const CitiesList: CitiesType = {
  ...Cities,
};

const initialList: Itemlist[] = [
  {
    Category: 'CSD',
    Type: 'CSD',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'ENERGY',
    Type: 'ENERGY',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'WATER',
    Type: 'WATER',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'ISOTONICS',
    Type: 'ISOTONICS',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'COFFEE',
    Type: 'COFFEE',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'TEA',
    Type: 'TEA',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
  {
    Category: 'JUICE',
    Type: 'JUICE',
    YearGrowthPercent: 0,
    MarketSalesPercent: 0,
  },
];

const inpValue: InputValue = {
  WATER: null,
  CSD: null,
  ENERGY: null,
  COFFEE: null,
  TEA: null,
  JUICE: null,
  ISOTONICS: null,
};

const App = () => {
  const [totalValue, setTotalValue] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(true);
  const [selectedState, setSelectedState] = React.useState(States[0]);
  const [selectedCity, setSelectedCity] = React.useState(CitiesList.default[0]);
  const [selectedDistributor, setSelectedDistributor] = React.useState(
    Distributors[0]
  );
  const [isDisabledCity, setIsDisabledCity] = React.useState(true);
  const [isDisabledState, setIsDisabledState] = React.useState(false);
  const [isDisabledDistributor, setIsDisabledDistributor] = React.useState(
    false
  );
  const [list, setList] = React.useState(initialList);
  const [distributorList, setDistributorList] = React.useState(initialList);
  const [inputValue, setInputValue] = React.useState(inpValue);

  const handleSelectedStateOption = (value: any) => {
    setSelectedState(value);
    if (value !== States[0]) {
      setIsDisabledCity(false);
      setIsDisabledDistributor(true);
    } else {
      setIsDisabledCity(true);
      setIsDisabledDistributor(false);
      setSelectedCity(CitiesList[selectedState.value][0]);
    }
  };

  const handleSelectedCityOption = (value: any) => {
    setSelectedCity(value);
    const tempList: any[] = [];
    GeographicSalesData.forEach((geo) => {
      if (geo.State === selectedState.value && geo.City === value.value)
        tempList.push(geo);
    });
    if (tempList.length > 0) {
      const newList = tempList.splice(0, tempList.length - 1);
      setList(newList);
    } else {
      setList(initialList);
    }
    setTotalValue(totalValue);
  };

  const handleSelectedDistributorOption = (value: any) => {
    setSelectedDistributor(value);
    if (value !== Distributors[0]) {
      setIsDisabledState(true);
    } else {
      setIsDisabledState(false);
    }
    const disList: any[] = [];
    DistributorSalesData.forEach((dis) => {
      if (dis.Distributor === value.value) disList.push(dis);
    });
    if (disList.length > 0) {
      const newDisList = disList.splice(0, disList.length - 1);
      setDistributorList(newDisList);
    } else {
      setDistributorList(initialList);
    }

    const tempList: any[] = [];
    GeographicSalesData.forEach((geo) => {
      if (geo.State === selectedState.value) tempList.push(geo);
    });
    if (tempList.length > 0) setList(tempList);
    else setList(initialList);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    const previewsValue = Number(inputValue[name]);
    setTotalValue(totalValue + Number(value) - previewsValue);
  };

  const showGrowthColumn = () => {
    setIsChecked((c) => !c);
  };

  // const createPdf = () => {
  //   const preview = document.getElementById('preview') as HTMLElement;
  //   html2canvas(preview, {
  //     scrollY: -window.scrollY,
  //     scale: 1,
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const imgWidth = 210;
  //     const pageHeight = 295;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     const doc = new Jspdf('p', 'mm', 'a4', true);
  //     let position = 0;
  //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     // eslint-disable-next-line
  //     doc.save('download.pdf');
  //   });
  // };

  // const createShare = () => {
  //   bridgeServices.createShare({
  //     subject: 'Redbull New account',
  //     files: [],
  //     message: 'so much great information in one presentation.',
  //     visual: true,
  //   });
  // };
  return (
    <div className={styles.container}>
      <Header />
      <AccountInfoPage />
      {/* <div className={styles.content}>
        <Geography
          Cities={CitiesList[selectedState.value]}
          Distributors={Distributors}
          GeoMarkets={GeographicSalesData}
          handleSelectedCityOption={handleSelectedCityOption}
          handleSelectedDistributorOption={handleSelectedDistributorOption}
          handleSelectedStateOption={handleSelectedStateOption}
          isDisabledCity={isDisabledCity}
          isDisabledDistributor={isDisabledDistributor}
          isDisabledState={isDisabledState}
          selectedCity={selectedCity}
          selectedDistributor={selectedDistributor}
          selectedState={selectedState}
          States={States}
        />
        <div id="preview">
          <ShelfCounts
            showGrowthColumn={showGrowthColumn}
            totalValue={totalValue}
            onChange={handleInputChange}
          />
          <Output
            checked={isChecked}
            distributorList={distributorList}
            inputValue={inputValue}
            list={list}
            selectedDistributor={selectedDistributor}
            totalValue={totalValue}
          />
        </div>
        <div className={styles.action}>
          <DateActionBtns />
        </div>
      </div> */}
    </div>
  );
};

export default App;

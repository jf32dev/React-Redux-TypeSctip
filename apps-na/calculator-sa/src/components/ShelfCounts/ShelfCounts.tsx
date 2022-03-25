import * as React from 'react';
import { Accordion, Modal } from '@redbull/components';
import { BsInfoCircleFill } from 'react-icons/bs';
import styles from './ShelfCounts.module.scss';

interface Props {
  onChange: (e: any) => void;
  totalValue: number;
  showGrowthColumn: () => void;
}

const ShelfCounts: React.FC<Props> = ({
  onChange,
  totalValue,
  showGrowthColumn,
}) => {
  const [isCsdOpen, setCsdOpen] = React.useState(false);
  const [isIsoOpen, setIsoOpen] = React.useState(false);
  const handleAccordionClick = (accordion: HTMLDivElement) => {
    setTimeout(
      () =>
        accordion.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      200
    );
  };

  const openCsdModal = (e: any) => {
    e.stopPropagation();
    setCsdOpen(true);
  };

  const openIsoModal = (e: any) => {
    e.stopPropagation();
    setIsoOpen(true);
  };

  const closeCsdModal = () => {
    setCsdOpen(false);
  };

  const closeIsoModal = () => {
    setIsoOpen(false);
  };
  return (
    <Accordion defaultExpanded={['shelfCounts']}>
      <Accordion.Item
        id="shelfCounts"
        title="ENTER CURRENT SHELF COUNTS"
        onClick={handleAccordionClick}
      >
        <div className={styles.container}>
          <div className={styles['shelf-counts-input']}>
            <div className={styles['input-section']}>
              <label htmlFor="csd">
                CSD <BsInfoCircleFill onClick={openCsdModal} />
              </label>
              <input
                className={styles.input}
                name="CSD"
                type="number"
                onChange={onChange}
              />
              <Modal
                closeModal={closeCsdModal}
                isOpen={isCsdOpen}
                title="CARBONATED SOFT DRINKS"
              >
                <ul>
                  <li>Low calorie soft drinks</li>
                  <li>Regular soft drinks</li>
                  <li>Tonic water/club soda</li>
                </ul>
              </Modal>
            </div>
            <div className={styles['input-section']}>
              <label htmlFor="energy">Energy</label>
              <input
                className={styles.input}
                name="ENERGY"
                type="number"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles['shelf-counts-input']}>
            <div className={styles['input-section']}>
              <label htmlFor="water">Water</label>
              <input
                className={styles.input}
                name="WATER"
                type="number"
                onChange={onChange}
              />
            </div>
            <div className={styles['input-section']}>
              <label htmlFor="energy">
                Isotonics
                <BsInfoCircleFill onClick={openIsoModal} />
              </label>
              <input
                className={styles.input}
                name="ISOTONICS"
                type="number"
                onChange={onChange}
              />
              <Modal
                closeModal={closeIsoModal}
                isOpen={isIsoOpen}
                title="ISOTONICS"
              >
                <ul>
                  <li>Sports Drinks</li>
                </ul>
              </Modal>
            </div>
          </div>
          <div className={styles['shelf-counts-input']}>
            <div className={styles['input-section']}>
              <label htmlFor="coffee">Coffee</label>
              <br />
              <input
                className={styles.input}
                name="COFFEE"
                type="number"
                onChange={onChange}
              />
            </div>
            <div className={styles['input-section']}>
              <label htmlFor="tea">Tea</label>
              <br />
              <input
                className={styles.input}
                name="TEA"
                type="number"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles['shelf-counts-input']}>
            <div className={styles['input-section']}>
              <label htmlFor="juice">Juice</label>
              <br />
              <input
                className={styles.input}
                name="JUICE"
                type="number"
                onChange={onChange}
              />
            </div>
            <div className={styles['input-section']}>
              <div className={styles['total-value']}>
                <p>Total:</p>
                <p>{totalValue}</p>
              </div>
            </div>
          </div>
          <div className="show-growth">
            <input
              id="show-growth"
              name="show-growth"
              type="checkbox"
              onChange={showGrowthColumn}
            />
            <label htmlFor="show-growth">SHOW GROWTH % VS PY</label>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  );
};

export default ShelfCounts;

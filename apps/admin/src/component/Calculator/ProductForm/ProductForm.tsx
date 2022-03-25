import * as React from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { withTypes } from 'react-final-form';
import { Mutator } from 'final-form';
import { Loader, NoDataError, useFlyin } from '@redbull/components';

import useGetFieldData from '../../../hooks/useGetFieldData';
import {
  saveProductData,
  getSelectedProduct,
  clearSelectedProduct,
} from '../../../store/product/action';
import { useTypedSelector } from '../../../store';

import CalculatorLayout from '../CalculatorLayout';
import FieldBackgroundColour from './components/FieldBackgroundColour';
import ImageUploadComponent from './components/ImageUploadComponent';
import SelectComponents from './components/SelectComponents';
import FormButtons from './components/FormButtons';
import InputFieldComponents from './components/InputFieldComponents';

import { FormRouteParams, ProductFormType } from './type';
import { mapDataToStateObject, mapFormStateToDataObject } from './utils';

import styles from './ProductForm.module.scss';

const ProductForm = () => {
  const dispatch = useDispatch();
  const params = useParams<FormRouteParams>();
  const { addFlyin } = useFlyin();

  const { action, productId, calcType, calcId } = params;
  const { Form } = withTypes<ProductFormType>();

  const {
    data: productData,
    error: productError,
    status: productStatus,
    isSaving,
    savingError,
  } = useTypedSelector((state) => state.product.selectedProduct);

  const {
    select: selectFields,
    input: inputFields,
    error: fieldError,
    status: fieldStatus,
  } = useGetFieldData(calcId);

  const [initialValues, setInitialValues] = React.useState({});

  const handleFormSubmit = (values: ProductFormType) => {
    // if product was edited and image was not changed
    let image = null;
    if (
      values.formType === 'uplift-distribution' ||
      values.formType === 'uplift-sales-driver'
    ) {
      if (typeof values.image !== 'string') {
        image = values.image;
      }
    }

    const data = {
      calculatorId: calcId,
      ...(productId && { id: productId }),
      ...mapFormStateToDataObject(values),
    };
    dispatch(saveProductData(calcType, data, image, action));
  };

  const setValue: Mutator<ProductFormType> = (
    [field, value],
    state,
    { changeValue }
  ) => {
    changeValue(state, field, () => value);
  };

  React.useEffect(() => {
    if (selectFields.length > 0) {
      const dataObject = mapDataToStateObject(
        productData,
        calcType,
        selectFields
      );
      setInitialValues(dataObject);
    }
  }, [calcType, productData, selectFields]);

  React.useEffect(() => {
    // productId is present when product is being EDITED
    if (productId) {
      dispatch(getSelectedProduct(productId));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  React.useEffect(() => {
    if (savingError) {
      addFlyin(savingError, { type: 'danger' });
    }
  }, [addFlyin, savingError]);

  return (
    <CalculatorLayout>
      {(productStatus === 'loading' || fieldStatus === 'loading') && (
        <Loader className={styles.loader} />
      )}
      {productError || fieldError ? (
        <NoDataError className={styles.error} title="Error loading the form.">
          There was an error loading the form or the product you selected.
          <br />
          Please try again.
        </NoDataError>
      ) : (
        fieldStatus === 'succeeded' && (
          <Form
            initialValues={initialValues}
            mutators={{
              setValue,
            }}
            subscription={{}}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, form: { mutators } }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                {isSaving && (
                  <div className={styles.savingScreen}>
                    <Loader
                      className={styles.savingLoader}
                      text="Saving product"
                      textColour="white"
                    />
                  </div>
                )}
                <div className={styles.content}>
                  {/* FORM BODY */}
                  <div className={styles.row}>
                    <SelectComponents
                      data={selectFields}
                      setValue={mutators.setValue}
                    />
                    <InputFieldComponents
                      data={inputFields}
                      setValue={mutators.setValue}
                    />
                  </div>
                  <div className={styles.row}>
                    {['uplift-distribution', 'uplift-sales-driver'].includes(
                      calcType
                    ) && <ImageUploadComponent setValue={mutators.setValue} />}
                    <div className={styles.col}>
                      <FieldBackgroundColour
                        label="Image Background Colour"
                        name="backgroundColor"
                      />
                    </div>
                  </div>
                </div>
                <FormButtons action={action} isSaving={isSaving} />
              </form>
            )}
          </Form>
        )
      )}
    </CalculatorLayout>
  );
};

export default ProductForm;

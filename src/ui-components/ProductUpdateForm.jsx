/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getProduct } from "../graphql/queries";
import { updateProduct } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProductUpdateForm(props) {
  const {
    id: idProp,
    product: productModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    slug: "",
    images: [],
    categories: [],
    sizes: [],
    colors: [],
    description: [],
    sku: [],
    currency: [],
    price: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [slug, setSlug] = React.useState(initialValues.slug);
  const [images, setImages] = React.useState(initialValues.images);
  const [categories, setCategories] = React.useState(initialValues.categories);
  const [sizes, setSizes] = React.useState(initialValues.sizes);
  const [colors, setColors] = React.useState(initialValues.colors);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [sku, setSku] = React.useState(initialValues.sku);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [price, setPrice] = React.useState(initialValues.price);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = productRecord
      ? { ...initialValues, ...productRecord }
      : initialValues;
    setName(cleanValues.name);
    setSlug(cleanValues.slug);
    setImages(cleanValues.images ?? []);
    setCurrentImagesValue("");
    setCategories(cleanValues.categories ?? []);
    setCurrentCategoriesValue("");
    setSizes(cleanValues.sizes ?? []);
    setCurrentSizesValue("");
    setColors(cleanValues.colors ?? []);
    setCurrentColorsValue("");
    setDescription(cleanValues.description ?? []);
    setCurrentDescriptionValue("");
    setSku(cleanValues.sku ?? []);
    setCurrentSkuValue("");
    setCurrency(cleanValues.currency ?? []);
    setCurrentCurrencyValue("");
    setPrice(cleanValues.price);
    setErrors({});
  };
  const [productRecord, setProductRecord] = React.useState(productModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getProduct,
              variables: { id: idProp },
            })
          )?.data?.getProduct
        : productModelProp;
      setProductRecord(record);
    };
    queryData();
  }, [idProp, productModelProp]);
  React.useEffect(resetStateValues, [productRecord]);
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
  const [currentCategoriesValue, setCurrentCategoriesValue] =
    React.useState("");
  const categoriesRef = React.createRef();
  const [currentSizesValue, setCurrentSizesValue] = React.useState("");
  const sizesRef = React.createRef();
  const [currentColorsValue, setCurrentColorsValue] = React.useState("");
  const colorsRef = React.createRef();
  const [currentDescriptionValue, setCurrentDescriptionValue] =
    React.useState("");
  const descriptionRef = React.createRef();
  const [currentSkuValue, setCurrentSkuValue] = React.useState("");
  const skuRef = React.createRef();
  const [currentCurrencyValue, setCurrentCurrencyValue] = React.useState("");
  const currencyRef = React.createRef();
  const validations = {
    name: [],
    slug: [],
    images: [],
    categories: [],
    sizes: [],
    colors: [],
    description: [],
    sku: [],
    currency: [],
    price: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          slug: slug ?? null,
          images: images ?? null,
          categories: categories ?? null,
          sizes: sizes ?? null,
          colors: colors ?? null,
          description: description ?? null,
          sku: sku ?? null,
          currency: currency ?? null,
          price: price ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateProduct,
            variables: {
              input: {
                id: productRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProductUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              slug,
              images,
              categories,
              sizes,
              colors,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Slug"
        isRequired={false}
        isReadOnly={false}
        value={slug}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              slug: value,
              images,
              categories,
              sizes,
              colors,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            value = result?.slug ?? value;
          }
          if (errors.slug?.hasError) {
            runValidationTasks("slug", value);
          }
          setSlug(value);
        }}
        onBlur={() => runValidationTasks("slug", slug)}
        errorMessage={errors.slug?.errorMessage}
        hasError={errors.slug?.hasError}
        {...getOverrideProps(overrides, "slug")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images: values,
              categories,
              sizes,
              colors,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.images ?? values;
          }
          setImages(values);
          setCurrentImagesValue("");
        }}
        currentFieldValue={currentImagesValue}
        label={"Images"}
        items={images}
        hasError={errors?.images?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("images", currentImagesValue)
        }
        errorMessage={errors?.images?.errorMessage}
        setFieldValue={setCurrentImagesValue}
        inputFieldRef={imagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Images"
          isRequired={false}
          isReadOnly={false}
          value={currentImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.images?.hasError) {
              runValidationTasks("images", value);
            }
            setCurrentImagesValue(value);
          }}
          onBlur={() => runValidationTasks("images", currentImagesValue)}
          errorMessage={errors.images?.errorMessage}
          hasError={errors.images?.hasError}
          ref={imagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "images")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories: values,
              sizes,
              colors,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.categories ?? values;
          }
          setCategories(values);
          setCurrentCategoriesValue("");
        }}
        currentFieldValue={currentCategoriesValue}
        label={"Categories"}
        items={categories}
        hasError={errors?.categories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("categories", currentCategoriesValue)
        }
        errorMessage={errors?.categories?.errorMessage}
        setFieldValue={setCurrentCategoriesValue}
        inputFieldRef={categoriesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Categories"
          isRequired={false}
          isReadOnly={false}
          value={currentCategoriesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.categories?.hasError) {
              runValidationTasks("categories", value);
            }
            setCurrentCategoriesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("categories", currentCategoriesValue)
          }
          errorMessage={errors.categories?.errorMessage}
          hasError={errors.categories?.hasError}
          ref={categoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "categories")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes: values,
              colors,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.sizes ?? values;
          }
          setSizes(values);
          setCurrentSizesValue("");
        }}
        currentFieldValue={currentSizesValue}
        label={"Sizes"}
        items={sizes}
        hasError={errors?.sizes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sizes", currentSizesValue)
        }
        errorMessage={errors?.sizes?.errorMessage}
        setFieldValue={setCurrentSizesValue}
        inputFieldRef={sizesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sizes"
          isRequired={false}
          isReadOnly={false}
          value={currentSizesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sizes?.hasError) {
              runValidationTasks("sizes", value);
            }
            setCurrentSizesValue(value);
          }}
          onBlur={() => runValidationTasks("sizes", currentSizesValue)}
          errorMessage={errors.sizes?.errorMessage}
          hasError={errors.sizes?.hasError}
          ref={sizesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sizes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes,
              colors: values,
              description,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.colors ?? values;
          }
          setColors(values);
          setCurrentColorsValue("");
        }}
        currentFieldValue={currentColorsValue}
        label={"Colors"}
        items={colors}
        hasError={errors?.colors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("colors", currentColorsValue)
        }
        errorMessage={errors?.colors?.errorMessage}
        setFieldValue={setCurrentColorsValue}
        inputFieldRef={colorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Colors"
          isRequired={false}
          isReadOnly={false}
          value={currentColorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.colors?.hasError) {
              runValidationTasks("colors", value);
            }
            setCurrentColorsValue(value);
          }}
          onBlur={() => runValidationTasks("colors", currentColorsValue)}
          errorMessage={errors.colors?.errorMessage}
          hasError={errors.colors?.hasError}
          ref={colorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "colors")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes,
              colors,
              description: values,
              sku,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.description ?? values;
          }
          setDescription(values);
          setCurrentDescriptionValue("");
        }}
        currentFieldValue={currentDescriptionValue}
        label={"Description"}
        items={description}
        hasError={errors?.description?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("description", currentDescriptionValue)
        }
        errorMessage={errors?.description?.errorMessage}
        setFieldValue={setCurrentDescriptionValue}
        inputFieldRef={descriptionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Description"
          isRequired={false}
          isReadOnly={false}
          value={currentDescriptionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.description?.hasError) {
              runValidationTasks("description", value);
            }
            setCurrentDescriptionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("description", currentDescriptionValue)
          }
          errorMessage={errors.description?.errorMessage}
          hasError={errors.description?.hasError}
          ref={descriptionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "description")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes,
              colors,
              description,
              sku: values,
              currency,
              price,
            };
            const result = onChange(modelFields);
            values = result?.sku ?? values;
          }
          setSku(values);
          setCurrentSkuValue("");
        }}
        currentFieldValue={currentSkuValue}
        label={"Sku"}
        items={sku}
        hasError={errors?.sku?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sku", currentSkuValue)
        }
        errorMessage={errors?.sku?.errorMessage}
        setFieldValue={setCurrentSkuValue}
        inputFieldRef={skuRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sku"
          isRequired={false}
          isReadOnly={false}
          value={currentSkuValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sku?.hasError) {
              runValidationTasks("sku", value);
            }
            setCurrentSkuValue(value);
          }}
          onBlur={() => runValidationTasks("sku", currentSkuValue)}
          errorMessage={errors.sku?.errorMessage}
          hasError={errors.sku?.hasError}
          ref={skuRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sku")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes,
              colors,
              description,
              sku,
              currency: values,
              price,
            };
            const result = onChange(modelFields);
            values = result?.currency ?? values;
          }
          setCurrency(values);
          setCurrentCurrencyValue("");
        }}
        currentFieldValue={currentCurrencyValue}
        label={"Currency"}
        items={currency}
        hasError={errors?.currency?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("currency", currentCurrencyValue)
        }
        errorMessage={errors?.currency?.errorMessage}
        setFieldValue={setCurrentCurrencyValue}
        inputFieldRef={currencyRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Currency"
          isRequired={false}
          isReadOnly={false}
          value={currentCurrencyValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.currency?.hasError) {
              runValidationTasks("currency", value);
            }
            setCurrentCurrencyValue(value);
          }}
          onBlur={() => runValidationTasks("currency", currentCurrencyValue)}
          errorMessage={errors.currency?.errorMessage}
          hasError={errors.currency?.hasError}
          ref={currencyRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "currency")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              slug,
              images,
              categories,
              sizes,
              colors,
              description,
              sku,
              currency,
              price: value,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || productModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || productModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

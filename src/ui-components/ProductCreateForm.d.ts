/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProductCreateFormInputValues = {
    name?: string;
    slug?: string;
    images?: string[];
    categories?: string[];
    sizes?: string[];
    colors?: string[];
    description?: string[];
    sku?: string[];
    currency?: string[];
    price?: number;
};
export declare type ProductCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    slug?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    categories?: ValidationFunction<string>;
    sizes?: ValidationFunction<string>;
    colors?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    sku?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductCreateFormOverridesProps = {
    ProductCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    slug?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    categories?: PrimitiveOverrideProps<TextFieldProps>;
    sizes?: PrimitiveOverrideProps<TextFieldProps>;
    colors?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    sku?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductCreateFormProps = React.PropsWithChildren<{
    overrides?: ProductCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProductCreateFormInputValues) => ProductCreateFormInputValues;
    onSuccess?: (fields: ProductCreateFormInputValues) => void;
    onError?: (fields: ProductCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductCreateFormInputValues) => ProductCreateFormInputValues;
    onValidate?: ProductCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProductCreateForm(props: ProductCreateFormProps): React.ReactElement;

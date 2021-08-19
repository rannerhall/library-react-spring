import {useState} from "react";
import ValidateLibraryItems from "@/libraryItems/ValidateLibraryItems";


const ToggleItemFields = () => {
    const [selectedOption, setSelectedOption] = useState();

    const [showCategoryField, setShowCategoryField] = useState(false);
    const [showTitleField, setShowTitleField] = useState(false);
    const [showAuthorField, setShowAuthorField] = useState(false);
    const [showPageField, setShowPageField] = useState(false);
    const [showRunTimeField, setShowRunTimeField] = useState(false);

    const showFields = () => {
        setCustomValidationSchema(bookValidationSchema);
        setShowTitleField(true);
        setShowAuthorField(true);
        setShowCategoryField(true);
        setShowPageField(true);
        setShowRunTimeField(true);
    }

    const [customValidationSchema, setCustomValidationSchema] = useState();

    const {
        bookValidationSchema,
        dvdValidationSchema,
    } = ValidateLibraryItems();

    const handleTypeChange = (option) => {
        setSelectedOption(option.target.value);
        setShowCategoryField(true);
        setShowTitleField(true);
        setShowAuthorField(true);

        if (option.target.value === "book" || option.target.value === "referenceBook") {
            setCustomValidationSchema(bookValidationSchema);
            setShowPageField(true);
            setShowRunTimeField(false);
        }
        if (option.target.value === "dvd" || option.target.value === "audioBook") {
            setCustomValidationSchema(dvdValidationSchema);
            setShowPageField(false);
            setShowRunTimeField(true);
        }
    }

    return {
        handleTypeChange: handleTypeChange,
        showFields: showFields,
        showTitleField,
        showAuthorField,
        showPageField,
        showCategoryField,
        customValidationSchema
    }
}

export default ToggleItemFields
import {useState} from "react";
import * as Yup from "yup";


const ValidateLibraryItems = () => {

    const bookValidationSchema = Yup.object().shape({
        type: Yup.string().required('Type is required'),
        categoryName: Yup.string().required('Category is required'),
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        pages: Yup.number().required('Pages is required'),
    });

    const dvdValidationSchema = Yup.object().shape({
        type: Yup.string().required('Type is required'),
        categoryName: Yup.string().required('Category is required'),
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        runTimeInMinutes: Yup.number().required('Run Time is required'),
    });

    // const validationSchema = Yup.object().shape({
    //     type: Yup.string().required('Type is required'),
    //     categoryName: Yup.string().required('Category is required'),
    //     title: Yup.string().required('Title is required'),
    //     author: Yup.string().required('Author is required'),
    // })

    return {
        //validationSchema,
        bookValidationSchema,
        dvdValidationSchema
    }
}

export default ValidateLibraryItems
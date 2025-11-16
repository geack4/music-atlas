import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

interface SearchBarParams{
    textPlaceholder: string,
    onSubmit:(text:string)=>void
}

export const SearchBar = (params: SearchBarParams) => {
    const schema = yup.object().shape({
        text: yup.string().required("To search you need to input text")
    })
    
    const {register,handleSubmit,formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit((data) => params.onSubmit(data.text))}>
                <p>
                    <input type="text" className="text-input" placeholder={params.textPlaceholder} {...register("text")} />
                    <input type="submit" value="&#128269;" className="submit-btn"/>
                </p>
                <p>
                    {errors.text?.message}
                </p>
            </form>
        </div>
    )
}
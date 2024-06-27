import SearchFormContent from "./SearchFormContent";

function SearchForm(props) {
    const savedDataHandler=(enteredData)=>{
    }
    return(
        <SearchFormContent onSave={savedDataHandler}/>
    )
}
export default SearchForm;
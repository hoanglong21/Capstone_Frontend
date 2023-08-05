import FormStyles from '../../assets/styles/Form.module.css'

const Language = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className="mx-5 ps-3">
            <h4>Choose your language</h4>
            <p>Adjust the language you see in menus</p>
            <form className="mt-4 needs-validation" noValidate>
                <select
                    className={`form-select ${FormStyles.formSelect} mb-1`}
                    aria-label="select language"
                >
                    <option value="1">English</option>
                    <option value="2">Tiếng Việt</option>
                    <option value="3">日本語</option>
                </select>
                <button
                    className="btn btn-primary px-4 mt-4"
                    onClick={handleSubmit}
                >
                    Change your language
                </button>
            </form>
        </div>
    )
}
export default Language

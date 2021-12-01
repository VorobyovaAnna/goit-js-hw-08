import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector("[name=email]"),
  textarea: document.querySelector("[name=message]"),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormDataInput, 500));

let formData = {
    email: '',
    message: '',
};

populateFormData();

/*
 * - Останавливаем поведение по умолчанию
 * - Убираем данные из хранилища
 * - Очищаем форму
 */
function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */
function onFormDataInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function populateFormData() {
    
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      formData = JSON.parse(savedData);
      refs.input.value = formData.email;
      refs.textarea.value = formData.message;
  }
}

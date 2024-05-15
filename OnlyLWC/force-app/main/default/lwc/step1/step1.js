import { LightningElement, api } from 'lwc';

export default class step1 extends LightningElement {
    @api firstName;
    @api lastName;
    @api dateOfBirth;
    @api isInvalid = false;
    @api errorMessages = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
        this.validateFields();
    }

    validateFields() {
        this.isInvalid = false;
        this.errorMessages = '';

        const today = new Date().toISOString().slice(0,10); // Get today's date as string in YYYY-MM-DD format
        if (this.dateOfBirth > today) {
            this.isInvalid = true;
            this.errorMessages += 'Date of Birth cannot be greater than today. ';
        }

        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(this.dateOfBirth)) {
            this.isInvalid = true;
            this.errorMessages += 'Date of Birth must be in the format YYYY-MM-DD. ';
        }

        this.template.querySelectorAll('lightning-input').forEach(input => {
            if (!input.checkValidity()) {
                this.isInvalid = true;
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        });
    }

    handleNext() {
        this.validateFields();
        if (!this.isInvalid) {
            const event = new CustomEvent('stepcomplete', {
                detail: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    dateOfBirth: this.dateOfBirth
                }
            });
            this.dispatchEvent(event);
        }
    }
}

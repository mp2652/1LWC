import { LightningElement, api } from 'lwc';

export default class step2 extends LightningElement {
    @api country;
    @api phoneNumber;
    @api isInvalid = false;
    @api errorMessages = '';

    countryOptions = [
        { label: 'USA', value: 'USA' },
        { label: 'Canada', value: 'Canada' },
        { label: 'France', value: 'France' },
        { label: 'Germany', value: 'Germany' },
        { label: 'United Kingdom', value: 'United Kingdom' },
        { label: 'Japan', value: 'Japan' },
        { label: 'Italy', value: 'Italy' },
        { label: 'Australia', value: 'Australia' },
        { label: 'Brazil', value: 'Brazil' },
        { label: 'China', value: 'China' },
        { label: 'India', value: 'India' },
        { label: 'Russia', value: 'Russia' },
        { label: 'South Africa', value: 'South Africa' },
        { label: 'Mexico', value: 'Mexico' },
        { label: 'Spain', value: 'Spain' },
        { label: 'Argentina', value: 'Argentina' },
        { label: 'Netherlands', value: 'Netherlands' },
        { label: 'Switzerland', value: 'Switzerland' },
        { label: 'Sweden', value: 'Sweden' },
        { label: 'Israel', value: 'Israel' }
    ];

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleCountryChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handlePhoneNumberChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
        this.validatePhoneNumber();
    }

    validatePhoneNumber() {
        const phoneRegex = /^[0-9]{10,15}$/;
        this.isInvalid = !phoneRegex.test(this.phoneNumber);
        this.errorMessages = this.isInvalid ? 'Please enter a valid phone number with 10 to 15 digits.': '';
    }

    handlePrevious() {
        const event = new CustomEvent('stepprevious');
        this.dispatchEvent(event);
    }

    handleNext() {
        this.validatePhoneNumber();
        if (!this.isInvalid) {
            const event = new CustomEvent('stepcomplete', {
                detail: {
                    country: this.country,
                    phoneNumber: this.phoneNumber
                }
            });
            this.dispatchEvent(event);
        }
    }
}

import { LightningElement,track } from 'lwc';

export default class multiStep extends LightningElement {
    firstName = '';
    lastName = '';
    dateOfBirth = '';
    country = '';
    phoneNumber = '';
    @track selectedStep ='Step1';


    isStep1 = true;
    isStep2 = false;
    isReview = false;

    handleStep1Complete(event) {
        this.firstName = event.detail.firstName;
        this.lastName = event.detail.lastName;
        this.dateOfBirth = event.detail.dateOfBirth;
        this.isStep1 = false;
        this.isStep2 = true;
        this.selectedStep = 'Step2';

    }

    handleStep2Complete(event) {
        this.country = event.detail.country;
        this.phoneNumber = event.detail.phoneNumber;
        this.isStep2 = false;
        this.isReview = true;
        this.selectedStep = 'Step3';

    }

    handleStep2Previous() {
        this.isStep2 = false;
        this.isStep1 = true;
        this.selectedStep = 'Step1';

    }

    handleReviewPrevious() {
        this.isReview = false;
        this.isStep2 = true;
        this.selectedStep = 'Step2';

    }

    handleReviewComplete() {
        // Handle form completion, maybe show a success message or redirect
        this.isReview = false;
        this.isStep1 = true;
        this.selectedStep = 'Step1';

    }

    handleFinish() {
        // Reset the form to the initial state
        this.firstName = '';
        this.lastName = '';
        this.dateOfBirth = '';
        this.country = '';
        this.phoneNumber = '';
        this.isStep1 = true;
        this.isStep2 = false;
        this.isReview = false;
        this.selectedStep = 'Step1';

    }
}



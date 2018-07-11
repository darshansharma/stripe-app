import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col, Button } from 'reactstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/collections/cards/index';
import { Users } from '/imports/collections/users/index';
import { composeWithTracker } from 'react-komposer';
import { Promise } from 'meteor/promise';


export default class StripeApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      cardNumber: '',
      mm: '',
      yy: '',
      cvc: '',
      remMe: false,
      makePayment: false,
      addCard: false,
    };
    this.getPaymentData = this.getPaymentData.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setCardNumber = this.setCardNumber.bind(this);
    this.setMM = this.setMM.bind(this);
    this.setYY = this.setYY.bind(this);
    this.setCVC = this.setCVC.bind(this);
    this.toggleRememberMe = this.toggleRememberMe.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.subscribeMonthlyPackage = this.subscribeMonthlyPackage.bind(this);
    this.addCardModal = this.addCardModal.bind(this);
  }

getPaymentData(event){
  event.preventDefault();

  Stripe.setPublishableKey('pk_test_JKwASDAvhnv6kP21u8s5wVGW');
  Stripe.card.createToken({
    name: 'Darshan Sharma',
    number: this.state.cardNumber,
    cvc: this.state.cvc,
    exp_month: this.state.mm,
    exp_year: this.state.yy,
}, (status, token) => {
  console.log('Status from Stripe: ' + status);
  if(status === 200){
    console.log(token);
    let data = { cardId: token.card.id, name: token.card.name, exp_month: String(token.card.exp_month), exp_year: String(token.card.exp_year), brand: String(token.card.brand), country: String(token.card.country), last4: String(token.card.last4), tokenId: String(token.id) };

    Bert.alert("Success", 'success');
    Meteor.call('cards.AddCardInDatabase' ,data, (error, response) => {
      if(error){
        console.log(error);
        Bert.alert('Something went Wrong', 'danger');
      }
      else{
        Bert.alert('Everything is Good', 'success');
      }
    });
  }
  else{
    Bert.alert('Invalid Card', 'danger');
  }

});

}

setEmail(event){
  this.setState({
    email: event.target.value,
  });
}

setCardNumber(event){
  this.setState({
    cardNumber: event.target.value,
  });
}

setMM(event){
  this.setState({
    mm: event.target.value,
  });
}

setYY(event){
  this.setState({
    yy: event.target.value,
  });
}


setCVC(event){
  this.setState({
    cvc: event.target.value,
  });
}

toggleRememberMe(event){
  this.setState({
    remMe: !this.state.remMe,
  });
}

createCustomer(){
  Meteor.call('users.AddCustomer', {email: this.state.email}, (error, response) => {
    if(error){
      Bert.alert('Customer Addition Failed', 'danger');
    }
    else{
      Bert.alert('Customer Added', 'success');
    }
  });

}

subscribeMonthlyPackage(){
  let subObj = {};
  subObj.plan = 'plan_DCOYNzhcobrnZC'; //planId of monthly50
  Meteor.call('users.subscribeMonthly',subObj, (error, response) => {
    if(error){
      console.log('Subscription Failed');
      Bert.alert('Subscription Failed', 'danger');
    }
    else{
      console.log('Subscribed to Monthly Package');
      Bert.alert('Subscribed to Monthly Package', 'success');
    }
  });
}

addCardModal(event){
  this.setState({
    addCard: !this.state.addCard,
  });
}

  render() {
    return(
      <div>
        <div className="checkout">
        <Button color="primary" onClick={this.createCustomer}>Create a Customer</Button>
        <br /><br />
        <Button color="primary" onClick={this.addCardModal}>Add Card</Button><br />< br/>
        <Button color="primary" onClick={this.subscribeMonthlyPackage}>Subscribe Monthly Package</Button><br />< br/>
        { this.state.addCard ?
          <Form onSubmit={this.getPaymentData} method='POST'>
            <FormGroup row>
            <Label sm={2}>EMAIL: </Label>
            <Col sm={5}>
              <Input type="email" placeholder='EMAIL' name='email' value={this.state.email} onChange={this.setEmail} />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label sm={2}>CARD NUMBER: </Label>
            <Col sm={5}>
              <Input type="number" placeholder='CARD NUMBER' value={this.state.cardNumber} onChange={this.setCardNumber} />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label sm={2}>MM/YY: </Label>
            <Col sm={5}>
              <Input type="number" placeholder='MM' value={this.state.mm} onChange={this.setMM} />
              <Input type="number" placeholder='YY' value={this.state.yy} onChange={this.setYY} />
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label sm={2}>CVC: </Label>
            <Col sm={5}>
              <Input type="number" placeholder='CVC' value={this.state.cvc} onChange={this.setCVC} />
            </Col>
            </FormGroup>
            <FormGroup check>
              <Label check>
              <Input type="checkbox" checked={this.state.remMe} onChange={this.toggleRememberMe} />{' '}
              Remember me
              </Label>
            </FormGroup><br />
            <Button color="success">Submit</Button>{' '}
          </Form>

         : null}


        </div>

    </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from "./Form.module.css";

class Form extends Component {
    state = { 
        name: "",
        number: "",
    }

    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };

     handleChange = (e) => {
        const { name, value } = e.currentTarget;

        this.setState({
        [name]: value,
        });
    };
    
     contactMatching = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;
    const namesInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );
    const numbersInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );

    if (
      namesInPhonebook.includes(name) ||
      numbersInPhonebook.includes(number)
    ) {
      alert(`${name}${number} is already in contacts`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all data');
      return true;
    }
  };

         
         

    handleSubmit = e => {
        const { name, number } = this.state;

        e.preventDefault();

        
        

        // Reset
        this.setState({ name: '', number: '' });
        if (this.contactMatching()) {
        return;
        }

        this.props.onSubmit(name, number);
        
    }

    
render() {
    return (
        <form onSubmit={this.handleSubmit} className={s.form}>
            <label className={s.label}>
            Name
            <input
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Alex BC"
                onChange={this.handleChange}
                className={s.input}
            />
            </label>
            <label className={s.label}>
            Number
            <input
                type="tel"
                name="number"
                value={this.state.number}
                placeholder="+38 (096) 6833554"
                onChange={this.handleChange}
                className={s.input}
            />
            </label>
            <button type="submit" className={s.button}>Add contact</button>
        </form>)
    }
 }

export default Form;
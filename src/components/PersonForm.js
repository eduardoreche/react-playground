import moment from 'moment';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { DateRangePicker } from 'react-dates';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import 'react-dates/lib/css/_datepicker.css';

class PersonForm extends Component {
  constructor(props) {
    super(props);

    moment.locale('pt-BR');

    this.state = {
      date: moment(),
      address: ''
    };

    this.renderDatePicker = this.renderDatePicker.bind(this);
    this.renderPlacesAutocomplete = this.renderPlacesAutocomplete.bind(this);
  }

  onSubmit(values) {
    console.log(values);
    console.log('Start', values.dateRange.startDate.format('DD-MMM-YYYY'));
    console.log('Finish', values.dateRange.endDate.format('DD-MMM-YYYY'));
  }

  renderPlacesAutocomplete({ input }) {
    const onChange = address => {
      input.onChange(address);
      this.setState({ address });
    };

    const inputProps = {
      value: this.state.address,
      placeholder: 'Search Places...',
      onChange
    };

    const options = {};

    return (
      <PlacesAutocomplete
        inputProps={inputProps}
        options={options}
        googleLogo={false}
      />
    );
  }

  renderDatePicker({
    input,
    focusedInput,
    onFocusChange,
    startDatePlacehoderText,
    endDatePlaceholderText
  }) {
    return (
      <DateRangePicker
        onDatesChange={(start, end) => input.onChange(start, end)}
        onFocusChange={onFocusChange}
        startDatePlaceholderText="Start"
        endDatePlaceholderText="End"
        focusedInput={focusedInput}
        startDate={(input.value && input.value.startDate) || null}
        endDate={(input.value && input.value.endDate) || null}
        minimumNights={0}
      />
    );
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { focusedInput, address } = this.state;

    return (
      <div>
        <h3>{this.state.date.format('DD-MM-YYYY')}</h3>

        <br />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                className="form-control"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>

          <div>
            <label>Date</label>
            <div>
              <Field
                name="dateRange"
                onFocusChange={this.onFocusChange.bind(this)}
                focusedInput={focusedInput}
                component={this.renderDatePicker}
              />
            </div>
          </div>

          <div>
            <label>Address</label>
            <div>
              <Field
                name="address"
                placeholder="Last Name"
                component={this.renderPlacesAutocomplete}
              />
            </div>
          </div>

          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

PersonForm = reduxForm({
  form: 'personForm'
})(PersonForm);

export default PersonForm;

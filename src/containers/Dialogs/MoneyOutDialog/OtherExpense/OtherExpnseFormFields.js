import React from 'react';
import { FastField, ErrorMessage } from 'formik';
import {
  Classes,
  FormGroup,
  InputGroup,
  TextArea,
  Position,
  ControlGroup,
} from '@blueprintjs/core';
import classNames from 'classnames';
import {
  FormattedMessage as T,
  AccountsSuggestField,
  InputPrependText,
  MoneyInputGroup,
  FieldRequiredHint,
  Col,
  Row,
} from 'components';
import { DateInput } from '@blueprintjs/datetime';
import { useAutofocus } from 'hooks';
import { ACCOUNT_TYPE } from 'common/accountTypes';

import {
  inputIntent,
  momentFormatter,
  tansformDateValue,
  handleDateChange,
} from 'utils';
import { CLASSES } from 'common/classes';
import { useMoneyOutDialogContext } from '../MoneyOutProvider';

/**
 * Other expense form fields.
 */
function OtherExpnseFormFields() {
  // Money in dialog context.
  const { accounts } = useMoneyOutDialogContext();

  const amountFieldRef = useAutofocus();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Row>
        <Col xs={5}>
          {/*------------ Date -----------*/}
          <FastField name={'date'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'date'} />}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="date" />}
                minimal={true}
                className={classNames(CLASSES.FILL, 'form-group--date')}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('date', formattedDate);
                  })}
                  value={tansformDateValue(value)}
                  popoverProps={{
                    position: Position.BOTTOM,
                    minimal: true,
                  }}
                  intent={inputIntent({ error, touched })}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/*------------ Transaction number -----------*/}
          <FastField name={'transaction_number'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'transaction_number'} />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="transaction_number" />}
                className={'form-group--transaction_number'}
              >
                <InputGroup
                  intent={inputIntent({ error, touched })}
                  {...field}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/*------------ amount -----------*/}
      <FastField name={'amount'}>
        {({
          form: { values, setFieldValue },
          field: { value },
          meta: { error, touched },
        }) => (
          <FormGroup
            label={<T id={'amount'} />}
            labelInfo={<FieldRequiredHint />}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="amount" />}
            className={'form-group--amount'}
          >
            <ControlGroup>
              <InputPrependText text={values.currency_code} />

              <MoneyInputGroup
                value={value}
                minimal={true}
                onChange={(amount) => {
                  setFieldValue('amount', amount);
                }}
                inputRef={(ref) => (amountFieldRef.current = ref)}
                intent={inputIntent({ error, touched })}
              />
            </ControlGroup>
          </FormGroup>
        )}
      </FastField>

      <Row>
        <Col xs={5}>
          {/*------------ other expense account -----------*/}
          <FastField name={'credit_account_id'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'cash_flow_transaction.label_expense_account'} />}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="credit_account_id" />}
                className={'form-group--credit_account_id'}
              >
                <AccountsSuggestField
                  accounts={accounts}
                  onAccountSelected={({ id }) =>
                    form.setFieldValue('credit_account_id', id)
                  }
                  filterByTypes={[
                    ACCOUNT_TYPE.EXPENSE,
                    ACCOUNT_TYPE.OTHER_EXPENSE,
                  ]}
                  inputProps={{
                    intent: inputIntent({ error, touched }),
                  }}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/*------------ Reference -----------*/}
          <FastField name={'reference_no'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'reference_no'} />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="reference_no" />}
                className={'form-group--reference-no'}
              >
                <InputGroup
                  intent={inputIntent({ error, touched })}
                  {...field}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>

      {/*------------ description -----------*/}
      <FastField name={'description'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'description'} />}
            className={'form-group--description'}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name={'description'} />}
          >
            <TextArea
              growVertically={true}
              large={true}
              intent={inputIntent({ error, touched })}
              {...field}
            />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}

export default OtherExpnseFormFields;

/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

/* =============================================
   =                   Setup                   =
   ============================================= */

/* ----------  External Libraries  ---------- */

import React from 'react';
import 'whatwg-fetch';

/* ----------  External UI Kit  ---------- */

import {
  Button,
  ButtonArea,
  CellBody,
  CellFooter,
  CellHeader,
  CellsTitle,
  Form,
  FormCell,
  Slider,
  Switch,
} from 'react-weui';

/* ----------  Internal Components  ---------- */

import Environment from './environment.jsx';
import GiftCategory from './gift-category.jsx';
import Loading from './loading.jsx';
import SkinType from './skin-type.jsx';

/* ----------  Helpers  ---------- */

import WebviewControls from '../messenger-api-helpers/webview-controls';
import {dateString} from '../utils/date-string-format';

/* ----------  Models  ---------- */

import Gift from '../models/gift';
import User from '../models/user';

const {ENVIRONMENTS} = User;

/* =============================================
   =            React Application              =
   ============================================= */

export default class App extends React.PureComponent {

  /* =============================================
     =               Configuration               =
     ============================================= */

  /* ----------  Top-level App Constants  ---------- */



  /**
   * Keeping the display labels in the front end as a separation of concerns
   * The actual values are being imported later via static attributes on
   * the models
   *
   * We have introduced an ordering dependency, but this is also the order that
   * we wish to display the options in the UI.
   */

  static giftCategories = [
    {
      title: 'Nike',
      subtitle: '6846 paires référencées',
      image: 'nike.jpg',
    },
    {
      title: 'adidas',
      subtitle: '3449 paires référencées',
      image: 'adidas.jpg',
    },
    {
      title: 'Reebok',
      subtitle: '1249 paires référencées',
      image: 'reebok.jpg',
    },
    {
      title: 'New Balance',
      subtitle: '692 paires référencées',
      image: 'Newbalance.png',
    },
    {
      title: 'Jordan',
      subtitle: '352 paires référencées',
      image: 'Jordan.png',
    },
  ]

  static skinTypes = [
    'Acne or blemishes',
    'Oiliness',
    'Loss of tone',
    'Wrinkles',
    'Sensitivity',
    'Dehydration (tight with oil)',
    'Dryness (flaky with no oil)',
    'Scars',
  ]


  /* ----------  React Configuration  ---------- */

  static propTypes = {
    userId: React.PropTypes.string.isRequired,
  }

  state = {
    giftCategory: null,
    environment: null,
    skinTypes: [],
    persist: true,
  }

  /* =============================================
     =               Helper Methods              =
     ============================================= */

  /* ----------  Communicate with Server  ---------- */

  /**
   * Pull saved data from the server, and populate the form
   * If there's an error, we log it to the console. Errors will not be availble
   * within the Messenger webview. If you need to see them 'live', switch to
   * an `alert()`.
   *
   * @returns {undefined}
   */
  pullData() {
    const endpoint = `/users/${this.props.userId}`;
    console.log(`Pulling data from ${endpoint}...`);

    fetch(endpoint)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        console.error(
          status,
          `Unable to fetch user data for User ${this.props.userId}'`
        );
      }).then((jsonResponse) => {
        console.log(`Data fetched successfully: ${jsonResponse}`);

        this.setState({
          ...jsonResponse,
          skinTypes: new Set(jsonResponse.skinTypes),
        });
      }).catch((err) => console.error('Error pulling data', err));
  }

  pushData() {
    const content = this.jsonState();
    console.log(`Push data: ${content}`);

    fetch(`/users/${this.props.userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: content,
    }).then((response) => {
      if (response.ok) {
        console.log('Data successfully updated on the server!');
        return;
      }

      console.error(
        response.status,
        `Unable to save user data for User ${this.props.userId}'`
      );
    }).catch((err) => console.error('Error pushing data', err)).then(() => {
      WebviewControls.close();
    });
  }

  /* ----------  Formatters  ---------- */

  // Format state for easy printing or transmission
  jsonState() {
    return JSON.stringify({
      ...this.state,
      skinTypes: [...this.state.skinTypes],
    });
  }

  /* ----------  State Handlers  ---------- */

  setGiftCategory(giftCategory) {
    console.log(`Gift Category: ${giftCategory}`);
    this.setState({giftCategory});
  }



  setEnvironment(envIndex) {
    const environment = ENVIRONMENTS[envIndex];
    console.log(`Environment: ${environment}`);
    this.setState({environment});
  }

  addSkinType(type) {
    console.log(`Add skin type: ${type}`);
    const oldSkinTypes = this.state.skinTypes;
    const skinTypes = new Set(oldSkinTypes);
    skinTypes.add(type);
    this.setState({skinTypes});
  }

  removeSkinType(type) {
    console.log(`Remove skin type: ${type}`);
    const oldSkinTypes = this.state.skinTypes;
    const skinTypes = new Set(oldSkinTypes);
    skinTypes.delete(type);
    this.setState({skinTypes});
  }

  setPersist(persist) {
    console.log(`Persist: ${JSON.stringify(persist)}`);
    this.setState({persist});
  }


  /* =============================================
     =              React Lifecycle              =
     ============================================= */

  componentWillMount() {
    this.pullData(); // Initial data fetch
  }

  /*
   * Provide the main structure of the resulting HTML
   * Delegates items out to specialized components
   *
   */
  render() {
    /**
     * If waiting for data, just show the loading spinner
     * and skip the rest of this function
     */
    if (!this.state.giftCategory) {
      return <Loading />;
    }

    /* ----------  Setup Sections (anything dynamic or repeated) ---------- */

    const skinTypes = App.skinTypes.map((label, index) => {
      const value = User.SKIN_TYPES[index];
      const checked = this.state.skinTypes.has(value);

      return (
        <SkinType
          key={value}
          value={value}
          label={label}
          checked={checked}
          addSkinType={this.addSkinType.bind(this)}
          removeSkinType={this.removeSkinType.bind(this)}
        />
      );
    });

    const giftCategories =
      App.giftCategories.map(({title, subtitle, image}, index) => {
        const value = Gift.CATEGORIES[index];

        return (
          <GiftCategory
            key={value}
            title={title}
            subtitle={subtitle}
            image={image}
            selected={value === this.state.giftCategory}
            setGiftCategory={() => this.setGiftCategory(value)}
          />
        );
      });


    const environments = User.ENVIRONMENTS.map((label) => {
      return (
        <Environment
          key={label}
          label={label}
          active={label === this.state.environment}
        />
      );
    });

    const {persist} = this.state;
    const persistSwitch = (
      <Switch
        defaultChecked={persist}
        onClick={() => this.setPersist(!persist)}
      />
    );

    /* ----------  Main Structure  ---------- */

    return (
      <div className='app'>
    

        <section>
          <CellsTitle>Preferred Brand Type</CellsTitle>
          <Form radio id='gift-type'>{giftCategories}</Form>
        </section>

        <section>
          <CellsTitle>What is your budget?</CellsTitle>
          <div id='env-slider'>
            <Slider
              min={0}
              max={300}
              step={10}
              defaultValue={150}
              showValue={true}
              onChange={this.setEnvironment.bind(this)}
            />
            {environments}
          </div>
        </section>

       
{/* 

     <section>
         <CellsTitle>What are your top skin concerns?</CellsTitle>
          <Form checkbox>{skinTypes}</Form>
     </section>

*/} 





        <section>
          <Form>
            <FormCell switch>
              <CellBody>Sauvegarder pour la prochaine fois</CellBody>
              <CellFooter>{persistSwitch}</CellFooter>
            </FormCell>
          </Form>
        </section>
        <ButtonArea className='see-options'>
          <Button onClick={() => this.pushData()}>Check Sneakers offers</Button>
        </ButtonArea>
      </div>
    );
  }
}

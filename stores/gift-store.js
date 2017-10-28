/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== STORES ================================================================
import Store from './store';

// ===== MODELS ================================================================
import Gift from '../models/gift';

const SERVER_URL = process.env.SERVER_URL;
const [NIKE, ADIDAS, REEBOK, NEWBALANCE, JORDAN] = Gift.CATEGORIES;

/**
 * Stores data for the Gifts we display to users
 */
class GiftStore extends Store {
  /**
   * Gets all gifts matching the given category
   *
   * @param {String} categoryId category to filter by
   * @returns {Object[]} all gifts matching the given category
   */
  getByCategoryId(categoryId) {
    /**
     * Maps don't have a filter method (nor map, reduce, and so on)
     * Rather than write our own, here we convert to an Array
     * and leverage the build-in filter method.
     */
    return [...this.data.values()]
      .filter((gift) => gift.category === categoryId);
  }

  /**
   * Inserts a gift to the Store using the gifts id as the key
   *
   * @param {Object} gift Gift to insert
   * @returns {Object} The inserted gift
   */
  insert(gift) {
    return this.set(gift.id, gift);
  }
}

/**
 * Initialize the global Gift Store and populate with Gifts for the demo
 */
const GIFT_STORE = new GiftStore();

/* eslint-disable max-len */
GIFT_STORE.insert(
  new Gift(
    'nike-airmax',
    'Nike Air Max 90 Essential',
    {
      original: `${SERVER_URL}/media/nike/airmax-new.png`,
      square: `${SERVER_URL}/media/nike/airmax-square.png`,
    },
    NIKE,
    118.00,
  ));


GIFT_STORE.insert(
  new Gift(
    'cleansers-lathering',
    'Lathering Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/lathering-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/lathering-square.jpg`,
    },
    ADIDAS,
    32.22,
  ));


GIFT_STORE.insert(
  new Gift(
    'masks-kara',
    'Belle Mask',
    {
      original: `${SERVER_URL}/media/masks/kara-new.jpg`,
      square: `${SERVER_URL}/media/masks/kara-square.jpg`,
    },
    REEBOK,
    1.99,
  ));


GIFT_STORE.insert(
  new Gift(
    'lip-kara',
    'Victoria B. Lip Butter',
    {
      original: `${SERVER_URL}/media/lip/kara-new.jpg`,
      square: `${SERVER_URL}/media/lip/kara-square.jpg`,
    },
    NEWBALANCE,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'jordan-kara',
    'Jordan B. Lip Butter',
    {
      original: `${SERVER_URL}/media/lip/kara-new.jpg`,
      square: `${SERVER_URL}/media/lip/kara-square.jpg`,
    },
    JORDAN,
    1.99,
  ));

/* eslint-enable max-len */

export default GIFT_STORE;

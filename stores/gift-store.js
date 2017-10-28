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
    'nike-softening',
    'Softening Cream',
    {
      original: `${SERVER_URL}/media/nike/softening-new.jpg`,
      square: `${SERVER_URL}/media/nike/softening-square.jpg`,
    },
    NIKE,
    8.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'nike-revitalizing',
    'Revitalizing Cream',
    {
      original: `${SERVER_URL}/media/nike/revitalizing-new.jpg`,
      square: `${SERVER_URL}/media/nike/revitalizing-square.jpg`,
    },
    NIKE,
    12.49,
  ));

GIFT_STORE.insert(
  new Gift(
    'cleansers-lathering',
    'Lathering Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/lathering-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/lathering-square.jpg`,
    },
    CLEANER,
    32.22,
  ));

GIFT_STORE.insert(
  new Gift(
    'cleansers-refining',
    'Refining Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/refining-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/refining-square.jpg`,
    },
    CLEANER,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'cleansers-kara',
    'VB Cleanser',
    {
      original: `${SERVER_URL}/media/cleansers/kara-new.jpg`,
      square: `${SERVER_URL}/media/cleansers/kara-square.jpg`,
    },
    CLEANER,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'masks-kara',
    'Belle Mask',
    {
      original: `${SERVER_URL}/media/masks/kara-new.jpg`,
      square: `${SERVER_URL}/media/masks/kara-square.jpg`,
    },
    MASK,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'masks-hydrating',
    'Hydrating Mask',
    {
      original: `${SERVER_URL}/media/masks/hydrating-new.jpg`,
      square: `${SERVER_URL}/media/masks/hydrating-square.jpg`,
    },
    MASK,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'masks-clay',
    'Clay Mask',
    {
      original: `${SERVER_URL}/media/masks/clay-new.jpg`,
      square: `${SERVER_URL}/media/masks/clay-square.jpg`,
    },
    MASK,
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
    LIP,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'lip-restorative',
    'Restorative Lip Balm',
    {
      original: `${SERVER_URL}/media/lip/restorative-new.jpg`,
      square: `${SERVER_URL}/media/lip/restorative-square.jpg`,
    },
    LIP,
    1.99,
  ));

GIFT_STORE.insert(
  new Gift(
    'lip-hydrating',
    'Hydrating Lip Butter',
    {
      original: `${SERVER_URL}/media/lip/hydrating-new.jpg`,
      square: `${SERVER_URL}/media/lip/hydrating-square.jpg`,
    },
    LIP,
    1.99,
  ));
/* eslint-enable max-len */

export default GIFT_STORE;

<?php

/**
 * @file
 * Form template functions.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_preprocess_bef_checkboxes().
 *
 * @{inheritdoc}
 */
function base_preprocess_bef_checkboxes(&$variables) {
  // Avoid displaying duplicate ids for checkboxes.
  $variables['attributes']['id'] = str_replace('--wrapper', '-bef--wrapper', $variables['attributes']['id']);
}

/**
 * Implements hook_preprocess_bef_radios().
 *
 * @{inheritdoc}
 */
function base_preprocess_bef_radios(&$variables) {
  // Avoid displaying duplicate ids for radios.
  $variables['attributes']['id'] = str_replace('--wrapper', '-bef--wrapper', $variables['attributes']['id']);
}

/**
 * Implements hook_form_views_exposed_form_alter().
 *
 * @{inheritdoc}
 */
function base_form_views_exposed_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  if ($form_id == 'views_exposed_form') {
    $form['Keyword']['#attributes']['placeholder'] = t('Find resources, videos, news, events and more ...');
  }
}

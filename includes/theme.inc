<?php

/**
 * @file
 * Theme template functions.
 */

/**
 * Implements hook_preprocess().
 *
 * @{inheritdoc}
 */
function base_preprocess(&$variables, $hook) {
  // The 'language' variable is supposed to be globally available in Twig
  // templates since Drupal 8.2, but sometimes it doesn't seem to work.
  // Force it here.
  $variables['language'] = \Drupal::languageManager()->getCurrentLanguage();
}

/**
 * Implements theme_suggestions_taxonomy_term_alter()
 *
 * @{inheritdoc}
 */
function base_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'taxonomy_term__' . $variables['elements']['name']['#bundle'] . '__' . $variables['elements']['#view_mode'];
}

/**
 * Implements hook_theme_suggestions_block_alter().
 *
 * @{inheritdoc}
 */
function base_theme_suggestions_block_alter(array &$suggestions, array $variables, $hook) {
  if (!empty($variables['elements']['content']['#block_content'])) {
    // Creates template theme suggestion for custom block type.
    array_splice($suggestions, 1, 0, 'block__bundle__' . $variables['elements']['content']['#block_content']->bundle());
    // Get bundle/block type.
  }
}

/**
 * Implements hook_preprocess_media().
 *
 * @{inheritdoc}
 */
function base_preprocess_media(&$variables) {
  // Adding the media url to the variables.
  $variables['url'] = $variables['media']->toUrl();
}

/**
 * Implements hook_preprocess_user().
 *
 * @{inheritdoc}
 */
function base_preprocess_user(&$variables) {
  // Adding the users url to the variables.
  $variables['user_link'] = $variables['user']->toUrl();
}

/**
 * Implements hook_theme_suggestions_user_alter().
 *
 * @{inheritdoc}
 */
function base_theme_suggestions_user_alter(&$suggestions, $variables, $hook) {
  // Define the view mode.
  $mode = $variables['elements']['#view_mode'];

  // Create a theme hook suggestion which has the view mode name in it.
  $suggestions[] = 'user__' . $mode;
}

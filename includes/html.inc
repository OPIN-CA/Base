<?php

/**
 * @file
 * HTML template functions.
 */

/**
 * Implements hook_preprocess_html().
 *
 * @{inheritdoc}
 */
function base_preprocess_html(&$variables) {
  // Add x-ua-compatible meta tag.
  $variables['page']['#attached']['html_head'][] = [
    [
      '#tag' => 'meta',
      '#attributes' => [
        'http-equiv' => 'x-ua-compatible',
        'content' => 'ie=edge',
      ],
    ],
    'x_ua_compatible',
  ];

  // Add a language to the body.
  $variables['language'] = \Drupal::languageManager()->getCurrentLanguage()->getId();

  // Add node type class.
  $node = \Drupal::routeMatch()->getParameter('node');
  if ($node) {
    $variables['attributes']['class'][] = 'path-node-' . $node->id();
  }

  // Add information about the number of sidebars to body.
  if (!empty(render($variables['page']['sidebar_first'])) && !empty(render($variables['page']['sidebar_second']))) {
    $variables['attributes']['class'][] = 'two-sidebars';
  }
  elseif (!empty(render($variables['page']['sidebar_first']))) {
    $variables['attributes']['class'][] = 'one-sidebar';
    $variables['attributes']['class'][] = 'sidebar-first';
  }
  elseif (!empty(render($variables['page']['sidebar_second']))) {
    $variables['attributes']['class'][] = 'one-sidebar';
    $variables['attributes']['class'][] = 'sidebar-second';
  }
  else {
    $variables['attributes']['class'][] = 'no-sidebars';
  }
}

/**
 * Implements hook_preprocess_block().
 *
 * @{inheritdoc}
 */
function base_preprocess_block(&$variables) {
  $variables['current_language'] = \Drupal::languageManager()->getCurrentLanguage();
  $variables['theme_path'] = base_path() . $variables['directory'];

  // Add block type class.
  if (!empty($variables['content']['#block_content'])) {
    // Get bundle/block type.
    $bundle = $variables['content']['#block_content']->bundle();
    // Set classname.
    $variables['attributes']['class'][] = 'block--' . str_replace('_', '-', $bundle);

    if ($bundle == 'call_out') {
      if (isset($variables['content']['field_link']['0']['#url'])) {
        $variables['link_var'] = $variables['content']['field_link']['0']['#url'];

        // We now unset the field link so it doesnt show up with the label.
        unset($variables['content']['field_link']);
      }
    }
  }
}

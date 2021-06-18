<?php

/*
 * This file is part of block-cat/guest-posting.
 *
 * Copyright (c) 2021 .
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace BlockCat\GuestPosting;

use Flarum\Extend;
use Flarum\Api\Event\Serializing;
use Flarum\Discussion\Event\Saving;

return [
    (new Extend\Routes('api'))
        ->post('/guest-post', 'block-cat-guest-posting.guest-post', Api\Controller\CreateDiscussionController::class),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Settings())
        ->serializeToForum('block-cat.guestId', 'block-cat.guest_id'),

    (new Extend\Event())->listen(Serializing::class, Listener\AddEmailAttributes::class),
    (new Extend\Event())->listen(Saving::class, Listener\SaveEmailAttributes::class),
];
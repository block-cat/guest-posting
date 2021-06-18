<?php

namespace BlockCat\GuestPosting\Listener;

use Flarum\Discussion\Event\Saving;
use Illuminate\Support\Arr;

class SaveEmailAttributes
{
    public function handle(Saving $event)
    {
        $discussion = $event->discussion;
        $data = $event->data;
        //$actor = $event->actor;
        $attributes = Arr::get($data, 'attributes', []);

        //$actor->assertCan('rename', $discussion);
        if (isset($attributes['guest_email'])) {
            $discussion->guest_email = $attributes['guest_email'];
            //$discussion->save();
        }
    }
}
<?php

namespace BlockCat\GuestPosting\Listener;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\DiscussionSerializer;

class AddEmailAttributes
{
    public function handle(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes += [
                'guest_email' => $event->model->guest_email,
            ];
        }
    }
}
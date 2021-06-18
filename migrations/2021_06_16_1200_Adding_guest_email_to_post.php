<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('discussions', 'guest_email')) {
            $schema->table('discussions', function (Blueprint $table) use ($schema) {
                $table->string('guest_email', 200)->index();
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) use ($schema) {
            $table->dropColumn('guest_email');
        });
    }
];
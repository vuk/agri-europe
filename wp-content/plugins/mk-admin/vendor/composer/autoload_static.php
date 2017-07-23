<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit5d884cbcab860d707288b3289f80b645
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'MkGroup\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'MkGroup\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'MkGroup\\Company' => __DIR__ . '/../..' . '/src/Company.php',
        'MkGroup\\People' => __DIR__ . '/../..' . '/src/People.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit5d884cbcab860d707288b3289f80b645::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit5d884cbcab860d707288b3289f80b645::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit5d884cbcab860d707288b3289f80b645::$classMap;

        }, null, ClassLoader::class);
    }
}

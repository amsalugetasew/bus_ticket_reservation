new webpack.ContextReplacementPlugin( 
    /(.+)?angular(\\|\/)core(.+)?/, 
    root('./src'), {} )
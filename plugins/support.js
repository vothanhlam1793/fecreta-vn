export default (context, inject) => {
    inject('controlNotify', (state) => {
        console.log(context);
        $nuxt.$emit('enableNotifyChanged', state);
    })
}
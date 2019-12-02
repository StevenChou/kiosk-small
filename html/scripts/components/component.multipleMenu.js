Vue.component("component-multipleMenu-navBar", {
    template: '#template-multipleMenu-navBar',
    props: ['culture', 'model'],
    data: function() {
        return{
        };
    },
    computed: {
        root: function() {
            return this.model.breadcrumbs.root;
        },
        current: function() {
            return this.model.breadcrumbs.current;
        },
    }
});
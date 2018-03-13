var app = new Vue({
    el: '#app',
    data: {
        addBlood: false,
        donors: [],
        loading: false,
        donating: false,
        donorName: "",
        donorPhone: "",
        donorCity: "",
        donorAddress: "",
        donorGroup: "",
        searchGroup: "A+",
        searchCity: ""
    },
    methods: {
        search: function () {
            app.loading = true;
            var searchQuery = {
                group: encodeURIComponent(app.searchGroup)
            };
            if (app.searchCity) {
                searchQuery.city = app.searchCity;
            };
            Sheetsu.read("https://sheetsu.com/apis/v1.0bu/7fe59afe565a", {
                search: searchQuery
            }).then(function (data) {
                console.log(data);
                app.donors = data;
                app.loading = false;
            },
                function (err) {
                    console.log(err);
                    app.donors = [];
                    app.loading = false;
                });
        },
        donateBlood: function () {
            var donorData = {
                name: app.donorName,
                phone: app.donorPhone,
                city: app.donorCity,
                address: app.donorAddress,
                group: app.donorGroup
            };
            app.donating = true;
            Sheetsu.write("https://sheetsu.com/apis/v1.0bu/7fe59afe565a", donorData, {
            }).then(function (data) {
                console.log(data);
                app.donors.push = data;
                app.donorName = "";
                app.donorPhone = "";
                app.donorCity = "";
                app.donorAddress = "";
                app.donorGroup = "";
                app.donating = false;
                alert("Thank you for submitting your details.")
            },
                function (err) {
                    console.log(err);
                    app.donating = false;
                });
        }
    }

})

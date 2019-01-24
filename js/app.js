var initialCats = [
	{
		clickCount: 0,
		name: 'Tabby',
		imgSrc: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'		
	},	{
		clickCount: 0,
		name: 'Sue',
		imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'		
	},	{
		clickCount: 0,
		name: 'Bill',
		imgSrc: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'		
	},	{
		clickCount: 0,
		name: 'Jioll',
		imgSrc: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?cs=srgb&dl=animal-animal-photography-cat-104827.jpg&fm=jpg',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'		
	},	{
		clickCount: 0,
		name: 'Chesiure',
		imgSrc: 'img/9648464288_2516b35537_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'		
	}
]

var Cat = function (data) {
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.catLevel = ko.computed(function() {
		var clicks = this.clickCount();
		if(clicks>100) {
			return "Teen";
		} else if(clicks>10) {
			return "Toddler";
		} else {
			return "infant";
		}
	}, this);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribution = ko.observable(data.imgAttribution);
}


var viewModel = function () {
	var self =this;
	this.catList = ko.observableArray([]);

	initialCats.forEach(function (catItem) {
		self.catList.push(new Cat(catItem));
	});

	this.currentCat = ko.observable(this.catList()[0]);

	this.incrementCounter = function () {
		this.clickCount(this.clickCount() + 1);
	};

	this.setCat = function (clickedCat) {
		self.currentCat(clickedCat);
	};
}

ko.applyBindings(new viewModel());
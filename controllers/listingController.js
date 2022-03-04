const Listing = require('../models/listingModel');
const factory = require('./handlerFactory');

exports.getAllListings = factory.getAll(Listing);

exports.getListing = factory.getOne(Listing, { path: 'reviews' });

exports.createListing = factory.createOne(Listing);

exports.updateListing = factory.updateOne(Listing);

exports.deleteListing = factory.deleteOne(Listing);

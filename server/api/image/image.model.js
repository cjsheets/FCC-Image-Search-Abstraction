'use strict';

import mongoose from 'mongoose';

var ImageSchema = new mongoose.Schema({
  term: String,
  when: String
});

export default mongoose.model('Image', ImageSchema);

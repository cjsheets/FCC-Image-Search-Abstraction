'use strict';

import mongoose from 'mongoose';

var LatestSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('FCC_Image-Seach-Abstraction_Latest', LatestSchema);

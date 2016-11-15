'use strict';

import mongoose from 'mongoose';

var LatestSchema = new mongoose.Schema({
  term: String,
  when: String
});

export default mongoose.model('Latest', LatestSchema);

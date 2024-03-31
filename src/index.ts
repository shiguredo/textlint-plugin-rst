"use strict";

import ReSTProcessor from "./ReSTProcessor"
import type { TextlintPluginCreator } from "@textlint/types"

export default {
    Processor: ReSTProcessor,
} as TextlintPluginCreator

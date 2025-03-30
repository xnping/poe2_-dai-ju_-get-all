
import { generateRule, type FilterRuleOptions } from './rules';

/**
 * @deprecated Use generateRule from './rules' instead
 */
function generateBasicRule(options: FilterRuleOptions): string {
    return generateRule(options);
}

export { generateBasicRule, type FilterRuleOptions };
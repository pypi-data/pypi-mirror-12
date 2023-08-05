# Copyright 2014 Facebook, Inc.

# You are hereby granted a non-exclusive, worldwide, royalty-free license to
# use, copy, modify, and distribute this software in source code or binary
# form for use in connection with the web services and APIs provided by
# Facebook.

# As with any software that integrates with the Facebook platform, your use
# of this software is subject to the Facebook Developer Principles and
# Policies [http://developers.facebook.com/policy/]. This copyright notice
# shall be included in all copies or substantial portions of the software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.

from examples.docs import fixtures
from facebookads import test_config
from facebookads.objects import AdCampaign

ad_account_id = test_config.account_id
app_id = test_config.app_id
app_store_url = 'https://itunes.apple.com/us/app/facebook/id284882215'
params = {
    AdCampaign.Field.objective: AdCampaign.Objective.mobile_app_installs
}
campaign_group_id = fixtures.create_adcampaign(params).get_id_assured()

# _DOC open [ADSET_CREATE_CPA]
# _DOC vars [ad_account_id:s, app_id, campaign_group_id, app_store_url:s]
import time
from facebookads.objects import AdSet

adset = AdSet(parent_id=ad_account_id)
adset.update({
    AdSet.Field.name: 'A CPA Ad Set',
    adset.Field.campaign_group_id: campaign_group_id,
    AdSet.Field.status: AdSet.Status.paused,
    AdSet.Field.daily_budget: 500,
    AdSet.Field.start_time: int(time.time()),
    AdSet.Field.end_time: int(time.time() + 100000),
    AdSet.Field.optimization_goal: AdSet.OptimizationGoal.app_installs,
    AdSet.Field.billing_event: AdSet.BillingEvent.app_installs,
    AdSet.Field.bid_amount: 100,
    AdSet.Field.promoted_object: {
        'application_id': app_id,
        'object_store_url': app_store_url
    },
    AdSet.Field.targeting: {
        'geo_locations': {
            'countries': ['US'],
        },
        'user_os': ['iOS'],
        'page_types': ['mobilefeed']
    },
})
adset.remote_create()

# _DOC close [ADSET_CREATE_CPA]

adset.remote_delete()

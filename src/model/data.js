import { nowIso } from '../utility/helpers.util.js';

export const bounties = [
    {
        id: "b_101",
        title: "The Lantern Marsh: Missing Cartographer",
        region: "swamp",
        threat: "medium",
        rewardGold: 180,
        postedBy: "Warden Elowen",
        details: "A cartographer vanished near the black reeds. Recover maps or confirm fate.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_102",
        title: "Ashridge Pass: Bandit Toll Ring",
        region: "mountains",
        threat: "high",
        rewardGold: 420,
        postedBy: "Merchant Guild",
        details: "Disable the toll ring without harming hostages. Evidence required.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_103",
        title: "Clockwork Orchard: Runaway Automaton",
        region: "plains",
        threat: "low",
        rewardGold: 95,
        postedBy: "Tinker Edda",
        details: "Return the automaton intact. Responds to the phrase 'saffron gear'.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_104",
        title: "Blackpine Forest: Vanishing Hunting Party",
        region: "forest",
        threat: "medium",
        rewardGold: 240,
        postedBy: "Ranger-Captain Holt",
        details: "Four hunters entered the inner forest and failed to return before dusk.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_105",
        title: "Saltwind Coast: Ghost Lights Beyond the Reef",
        region: "coast",
        threat: "low",
        rewardGold: 130,
        postedBy: "Harbormaster Venn",
        details: "Strange lights lure ships off course during low tide. Investigate source.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_106",
        title: "Redglass Dunes: Caravan Lost to the Storm",
        region: "desert",
        threat: "high",
        rewardGold: 500,
        postedBy: "Eastern Trade Consortium",
        details: "Locate the missing caravan. Recover manifests and survivors if possible.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_107",
        title: "Frostline Peaks: Signal Fire at Dawnspire",
        region: "mountains",
        threat: "medium",
        rewardGold: 310,
        postedBy: "Border Watch",
        details: "An unauthorized signal fire was lit at the old Dawnspire tower.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    },
    {
        id: "b_108",
        title: "Mirefall Basin: Poisoned Water Source",
        region: "swamp",
        threat: "high",
        rewardGold: 390,
        postedBy: "Council of Mirefall",
        details: "The basin’s water has turned black and bitter. Identify and neutralize cause.",
        status: "open",
        createdAt: nowIso(),
        updatedAt: nowIso()
    }
];

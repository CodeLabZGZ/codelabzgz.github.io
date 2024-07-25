---
title: "Two Sum"
description: ""
points: 200
difficulty: "easy"
author: "leetcode.com"
---

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

### Example 1:

> **Input**: nums = [2,7,11,15], target = 9<br/>**Output**: [0,1]<br/>**Explanation**: Because nums[0] + nums[1] == 9, we return [0, 1].

### Example 2:

> **Input**: nums = [3,2,4], target = 6<br/>**Output**: [1,2]

### Example 3:

> **Input**: nums = [3,3], target = 6<br/>**Output**: [0,1]

### Constraints:

- $2 \le nums.length \le 10^4$
- $-10^9 \le nums[i] \le 10^9$
- $-10^9 \le target \le 10^9$
- Only one valid answer exists.

**Follow-up**: Can you come up with an algorithm that is less than $O(n^2)$ time complexity?

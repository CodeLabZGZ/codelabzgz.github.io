---
title: "Maximum Subarray"
description: ""
points: 200
difficulty: "medium"
author: "leetcode.com"
---

Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

### Example 1:

> **Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]<br/> > **Output:** 6<br/> > **Explanation:** The subarray [4,-1,2,1] has the largest sum 6.

### Example 2:

> Input: nums = [1]<br/>
> Output: 1<br/>
> Explanation: The subarray [1] has the largest sum 1.

### Example 3:

> Input: nums = [5,4,-1,7,8]<br/>
> Output: 23<br/>
> Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

### Constraints:

- $1 \le nums.length \le 10^5$
- $-10^4 \le nums[i] \le 10^4$

**Follow up**: If you have figured out the $O(n)$ solution, try coding another solution using the divide and conquer approach, which is more subtle.

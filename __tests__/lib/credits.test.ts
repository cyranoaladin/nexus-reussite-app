import { calculateCreditCost, checkCreditBalance, debitCredits, refundCredits, canCancelBooking } from '../../lib/credits';
import { prisma } from '../../lib/prisma';
import { ServiceType } from '../../types/enums';

// Mock the prisma module
jest.mock('../../lib/prisma');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('Credits System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateCreditCost', () => {
    it('should return 1 for a COURS_ONLINE', () => {
      const cost = calculateCreditCost('COURS_ONLINE' as ServiceType);
      expect(cost).toBe(1);
    });

    it('should return 1.25 for a presential course', () => {
      const cost = calculateCreditCost('COURS_PRESENTIEL' as ServiceType);
      expect(cost).toBe(1.25);
    });

    it('should return 1.5 for a group workshop', () => {
      const cost = calculateCreditCost('ATELIER_GROUPE' as ServiceType);
      expect(cost).toBe(1.5);
    });

    it('should return 1 for an unknown service type', () => {
      const cost = calculateCreditCost('UNKNOWN_TYPE' as ServiceType);
      expect(cost).toBe(1);
    });
  });

  describe('checkCreditBalance', () => {
    it('should return true when student has enough credits', async () => {
      const mockTransactions = [
        { amount: 5, expiresAt: null },
        { amount: -2, expiresAt: null },
        { amount: 3, expiresAt: new Date(Date.now() + 86400000) } // expires tomorrow
      ];

      mockPrisma.creditTransaction.findMany.mockResolvedValue(mockTransactions as any);

      const result = await checkCreditBalance('student-123', 5);
      expect(result).toBe(true);
      expect(mockPrisma.creditTransaction.findMany).toHaveBeenCalledWith({
        where: {
          studentId: 'student-123',
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: expect.any(Date) } }
          ]
        }
      });
    });

    it('should return false when student has insufficient credits', async () => {
      const mockTransactions = [
        { amount: 2, expiresAt: null },
        { amount: -1, expiresAt: null }
      ];

      mockPrisma.creditTransaction.findMany.mockResolvedValue(mockTransactions as any);

      const result = await checkCreditBalance('student-123', 5);
      expect(result).toBe(false);
    });

    it('should exclude expired credits from calculation', async () => {
      const mockTransactions = [
        { amount: 5, expiresAt: null },
        { amount: -2, expiresAt: null }
      ];

      mockPrisma.creditTransaction.findMany.mockResolvedValue(mockTransactions as any);

      const result = await checkCreditBalance('student-123', 2);
      expect(result).toBe(true);
    });
  });

  describe('debitCredits', () => {
    it('should create a debit transaction with negative amount', async () => {
      const mockTransaction = {
        id: 'transaction-123',
        studentId: 'student-123',
        type: 'USAGE',
        amount: -1.25,
        description: 'Test session booking',
        sessionId: 'session-123'
      };

      mockPrisma.creditTransaction.create.mockResolvedValue(mockTransaction as any);

      const result = await debitCredits('student-123', 1.25, 'session-123', 'Test session booking');

      expect(result).toEqual(mockTransaction);
      expect(mockPrisma.creditTransaction.create).toHaveBeenCalledWith({
        data: {
          studentId: 'student-123',
          type: 'USAGE',
          amount: -1.25,
          description: 'Test session booking',
          sessionId: 'session-123'
        }
      });
    });
  });

  describe('refundCredits', () => {
    it('should create a refund transaction with positive amount', async () => {
      const mockTransaction = {
        id: 'transaction-124',
        studentId: 'student-123',
        type: 'REFUND',
        amount: 1.25,
        description: 'Session cancellation refund',
        sessionId: 'session-123'
      };

      mockPrisma.creditTransaction.create.mockResolvedValue(mockTransaction as any);

      const result = await refundCredits('student-123', 1.25, 'session-123', 'Session cancellation refund');

      expect(result).toEqual(mockTransaction);
      expect(mockPrisma.creditTransaction.create).toHaveBeenCalledWith({
        data: {
          studentId: 'student-123',
          type: 'REFUND',
          amount: 1.25,
          description: 'Session cancellation refund',
          sessionId: 'session-123'
        }
      });
    });
  });
});

describe('Booking Cancellation Logic', () => {
  describe('canCancelBooking', () => {
    it('should return true if cancellation is 25 hours before a particular course', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-14T13:00:00.000Z'); // 25 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'COURS_PRESENTIEL' as ServiceType);
      expect(canCancel).toBe(true);
    });

    it('should return false if cancellation is 23 hours before a particular course', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-14T15:00:00.000Z'); // 23 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'COURS_PRESENTIEL' as ServiceType);
      expect(canCancel).toBe(false);
    });

    it('should return false if cancellation is 47 hours before a group workshop', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-13T15:00:00.000Z'); // 47 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'ATELIER_GROUPE' as ServiceType);
      expect(canCancel).toBe(false);
    });

    it('should return true if cancellation is 49 hours before a group workshop', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-13T13:00:00.000Z'); // 49 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'ATELIER_GROUPE' as ServiceType);
      expect(canCancel).toBe(true);
    });

    it('should handle online courses with 24h rule', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-14T13:30:00.000Z'); // 24.5 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'COURS_ONLINE' as ServiceType);
      expect(canCancel).toBe(true);
    });

    it('should default to 24h rule for unknown session types', () => {
      const scheduledAt = new Date('2024-12-15T14:00:00.000Z');
      const currentTime = new Date('2024-12-14T13:00:00.000Z'); // 25 hours before
      
      const canCancel = canCancelBooking(scheduledAt, currentTime, 'UNKNOWN_TYPE' as ServiceType);
      expect(canCancel).toBe(true);
    });
  });
});

class Coffee < ApplicationRecord
      before_validation :calc_caff

      def calc_caff
        self.caffeine_percentage = self.caffeine_content * 28 * 0.008
      end
end
